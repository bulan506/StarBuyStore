using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using storeApi.DataBase;
using storeApi.Hubs;
namespace storeApi;

public sealed class LogicCampaigns
{
    private CampaignsDatabase campaignsDatabase;
    private readonly IHubContext<CampaignsHub> hubContext;

    public LogicCampaigns(IHubContext<CampaignsHub> hubContext)
    {
        this.hubContext = hubContext;
        campaignsDatabase = new CampaignsDatabase();
    }

    public async Task<Campanna> InsertCampaignAsync(Campanna campanna)
    {
        if (campanna == null) throw new ArgumentException("El cuerpo de la solicitud no puede estar vacío.");
        if (string.IsNullOrEmpty(campanna.Title)) throw new ArgumentException("El título de la campaña es obligatorio.");
        if (string.IsNullOrEmpty(campanna.ContentCam)) throw new ArgumentException("El contenido de la campaña es obligatorio.");
        if (campanna.ContentCam.Length > 5000) throw new ArgumentException("El contenido de la campaña no puede exceder los 5000 caracteres.");
        try
        {
            var insertedCampanna = await campaignsDatabase.InsertCampaignAsync(campanna);
            await hubContext.Clients.All.SendAsync("UpdateCampaigns", insertedCampanna.ContentCam, insertedCampanna.Title, insertedCampanna.Id);
            return insertedCampanna; // Devuelve la campaña insertada
        }
        catch (Exception ex)
        {
            throw new Exception("Error al insertar la campaña y enviar la actualización a través de SignalR", ex);
        }
    }
    public async Task<IEnumerable<Campanna>> GetAllCampaignsAsync()
    {
        return await campaignsDatabase.GetAllCampaigns();
    }
     public async Task<IEnumerable<Campanna>> GetTOP3CampaignsAsync()
    {
        return await campaignsDatabase.GetLastTop3Campaigns();
    }

    public async Task<bool> DeleteCampaign(int id)
    {
        var isDeleted = campaignsDatabase.DeleteCampaign(id);
        if (isDeleted)
        {
            await hubContext.Clients.All.SendAsync("DeleteCampaigns", id);
            return isDeleted;
        }
        return isDeleted;
    }
}

public class Campanna
{
    public int Id { set; get; }
    public string Title { set; get; }
    public string ContentCam { set; get; }
    public DateTime DateCam { set; get; }
    public int IsDeleted { set; get; }

    public Campanna(int id, string title, string contentCam, DateTime dateCam, int isDeleted)
    {
        if (id < 0) throw new ArgumentException("El cuerpo de la solicitud no puede estar vacío.");
        if (string.IsNullOrEmpty(title)) throw new ArgumentException("El título de la campaña es obligatorio.");
        if (string.IsNullOrEmpty(contentCam)) throw new ArgumentException("El contenido de la campaña es obligatorio.");
        if (contentCam.Length > 5000) throw new ArgumentException("El contenido de la campaña no puede exceder los 5000 caracteres.");
        this.Id = id;
        this.Title = title;
        this.ContentCam = contentCam;
        this.DateCam = dateCam;
        this.IsDeleted=isDeleted;
    }
}