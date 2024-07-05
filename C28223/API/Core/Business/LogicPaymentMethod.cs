using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using storeApi.DataBase;
using storeApi.Hubs;
using storeApi.Models;
namespace storeApi;

public sealed class LogicPaymentMethod
{
    private PaymentMethodDataB paymentMethodDataB = new PaymentMethodDataB();
    public LogicPaymentMethod()
    {
        paymentMethodDataB = new PaymentMethodDataB();
    }

    public Task<IEnumerable<PaymentMethodData>> GetPaymentMethodsAsync()
    {
        return paymentMethodDataB.GetAllPaymentMethodsAsync();
    }

    public Task<bool> UpdatePaymentMethodStatusAsync(int id, int isActive)
    {
        if (id < 0) throw new ArgumentException($"{nameof(id)} must be a positive integer.");
        if (isActive != 0 && isActive != 1) throw new ArgumentException($"{nameof(isActive)} must be either 0 (inactive) or 1 (active).");
        return paymentMethodDataB.UpdatePaymentMethodStatusAsync(id, isActive);
    }

}