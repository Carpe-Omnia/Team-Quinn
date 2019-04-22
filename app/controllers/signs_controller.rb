class SignsController < ApplicationController

  def create
    puts params
    sign = Sign.new(sign_params)
    if !!sign.save
      render json: {
        status: "success",
        message: "Route found",
        data: {sign: sign}
      }, status: :ok
    else
      render json: {
        status: "failure",
        message: "Route found, sign not made"
      }, status: :ok
    end
  end

  def index
  end
  private

  def sign_params
    params.require(:sign).permit(:lat, :lng, :name, :delivery, :address)
  end

end
