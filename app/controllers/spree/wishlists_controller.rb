class Spree::WishlistsController < Spree::StoreController
  include Spree::Core::ControllerHelpers::Order
  helper 'spree/products'
  before_action :authorize_wishlist
  before_action :find_wishlist, only: [:destroy, :show, :update, :edit]

  respond_to :html
  respond_to :js, only: :update

  def new
    @wishlist = Spree::Wishlist.new
    respond_with(@wishlist)
  end

  def index
    @wishlists = try_spree_current_user.wishlists
    respond_with(@wishlist)
  end

  def edit
    respond_with(@wishlist)
  end

  def update
    @wishlist.update wishlist_attributes
    respond_with(@wishlist)
  end

  def show
    respond_with(@wishlist)
  end

  def default
    @wishlist = try_spree_current_user.wishlist
    respond_with(@wishlist) do |format|
      format.html { render :show }
    end
  end

  def create
    @wishlist = Spree::Wishlist.new wishlist_attributes
    @wishlist.user = spree_current_user
    @wishlist.save
    respond_with(@wishlist)
  end

  def destroy
    @wishlist.destroy
    respond_with(@wishlist) do |format|
      format.html { redirect_to account_path }
    end
  end

  private

  def authorize_wishlist
    authorize! action_name, Spree::Wishlist
  end

  def wishlist_attributes
    params.require(:wishlist).permit(:name, :is_default, :is_private)
  end

  # Isolate this method so it can be overwritten
  def find_wishlist
    @wishlist = Spree::Wishlist.find_by_access_hash!(params[:id])
  end
end
