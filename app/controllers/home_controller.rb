class HomeController < ApplicationController
  def top
    # ランダムにレコードから取り出す
    @data = Person.joins(:messages).select("people.name, messages.content").offset( rand(Message.count) ).first
    logger.info(@data)
    # データがない場合は新規登録画面へ遷移
    if !@data
      logger.info("データなし")
      redirect_to("/posts/index")
    end
  end
end
