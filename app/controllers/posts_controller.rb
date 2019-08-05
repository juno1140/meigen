class PostsController < ApplicationController

  protect_from_forgery #CSRFによるエラー対策

  def index
  end

  def create
    # 新規の人物ならばPersonテーブルに追加
    if !Person.find_by(name: params[:person])
      if !Person.new(name: params[:person]).save
        # 空文字などエラーの場合は単に元のページへ戻る
        render("posts/index")
        return
      end
      logger.info("人物登録完了")
    end

    # Person登録後にこれを定義しないと名言登録時にそんなPerson.idはないというエラーになる
    person = Person.find_by(name: params[:person])

    # 名言の登録
    person.messages.create(content: params[:msg]).save
    logger.info("名言新規登録完了")
    flash[:notice] = "登録されました！"
    render("posts/index")
  end

  def edit
    @data = Person.joins(:messages).select("people.id as pid, people.name, messages.id as mid, messages.content").where("messages.id = ?", params[:id]).first
    logger.info(@data)
  end

  def update

    person_name = params[:person]

    # トランザクション
    ActiveRecord::Base.transaction do

      # 新規の人物ならばPersonテーブルに追加
      if !Person.find_by(name: person_name)
        newPerson = Person.new(name: person_name)
        if !newPerson.save
          return
        end
        logger.info("人物新規登録完了")
        person_name = newPerson.name
      end

      # Person登録後にこれを定義しないと名言登録時にそんなPerson.idはないというエラーになる
      person = Person.find_by(name: person_name)

      # 名言の登録
      msg = Message.find(params[:id])
      msg.content = params[:msg]
      msg.person_id = person.id
      
      if msg.save
        @data = Person.joins(:messages).select("people.id as pid, people.name, messages.id as mid, messages.content").where("messages.id = ?", msg.id).first
        logger.info("名言新規登録完了")
        flash[:notice] = "更新されました！"
        render("posts/edit")
      else
        # エラーの場合はロールバック
        raise ActiveRecord::Rollback
      end

    end # トランザクション終了

    return

  end


  def destroy
    logger.info("-----削除-----")
    msg = Message.find(params[:id]).destroy

    if Message.where(person_id: msg.person_id).count != 0
      logger.info("データがなくなりました")
      redirect_to("/list/#{msg.person_id}/personDetails")
    else
      redirect_to("/list/personList")
    end
  end

end