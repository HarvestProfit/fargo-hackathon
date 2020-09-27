class PagesController < ApplicationController
  def home
    redirect_to ENV.fetch('FRONTEND_URL', 'http://localhost:3000')
  end
end
