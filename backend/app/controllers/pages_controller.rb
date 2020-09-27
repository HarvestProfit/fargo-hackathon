class PagesController < ApplicationController
  def home
    render json: { status: 'success' }
  end
end
