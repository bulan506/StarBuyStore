using MediatR;
using StoreApi.Models;

namespace StoreApi.Queries
{
    public class GetSalesByPurchaseNumberQuery :  IRequest<Sales>
    {
        public string PurchaseNumber { get; set; }
    }
}