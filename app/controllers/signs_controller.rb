class SignsController < ApplicationController

  def create
    puts params
    sign = Sign.new(sign_params)
    if !!sign.save
      render json: {
        status: "success",
        message: "Route found, sign made.",
        data: {sign: sign}
      }, status: :ok
    else
      render json: {
        status: "failure",
        message: "Route found, sign not made."
      }, status: :ok
    end
  end

  def index
    signs = Sign.all
    render json: {
      status: "success",
      message: "signs found",
      data: {signs: signs}
    }, status: :ok
  end
  def update
    puts params
    sign = Sign.find_by(id: params[:id])
    sign.update(sign_params)
    render json: {
      status: "success",
      message: "signs found",
      data: {sign: sign}
    }, status: :ok
  end
  def delete
    sign = Sign.find_by(id: params[:id])
    if !!sign
      sign.destroy()
      render json: {
        status: "success",
        message: "sign destroyed"
      }, status: :ok
    else
      render json: {
        status: "failure",
        message: "sign not found"
      }, status: :ok
    end
  end

  private

  def sign_params
    params.require(:sign).permit(:lat, :lng, :name, :delivery, :address)
  end

end
