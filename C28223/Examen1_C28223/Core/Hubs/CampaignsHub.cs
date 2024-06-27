using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
namespace storeApi.Hubs
{
    public class CampaignsHub : Hub
    {
        public async Task NotifyNewCampaign(string contentCampaing, string title, int id)
        {
            await Clients.All.SendAsync("UpdateCampaigns", contentCampaing, title, id);
        }
          public async Task NotifyDeleteCampaign(int id)
        {
            await Clients.All.SendAsync("DeleteCampaigns", id);
        }
    }
}
