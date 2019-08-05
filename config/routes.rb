Rails.application.routes.draw do

  # TOPページ
  get '/' => 'home#top'

  # リストページ
  get 'list/personList' => 'list#personList'
  get 'list/:id/personDetails' => 'list#personDetails'

  # 登録・更新・削除ページ  
  get 'posts/index'
  get 'posts/create' => 'posts#index'
  post 'posts/create' => 'posts#create'
  get 'posts/:id/edit' => 'posts#edit'
  post 'posts/:id/update' => 'posts#update'
  get 'posts/:id/update' => 'posts#edit'
  get 'posts/:id/destroy' => 'posts#destroy'

end
