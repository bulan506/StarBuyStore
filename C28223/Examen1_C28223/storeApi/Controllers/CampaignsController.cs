using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using storeApi.Models.Data;
using storeApi.Models;

namespace storeApi.Controllers
{
    [Route("api/"), Authorize(Roles = "Admin")]
    [ApiController]
    public class CampaignsController : ControllerBase
    {
        private readonly LogicCampaigns logicCampaigns;

        public CampaignsController(LogicCampaigns logicCampaigns)
        {
            this.logicCampaigns = logicCampaigns;
        }

        [HttpPost("admin/campaigns"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> NewCampaign([FromBody] Campanna campanna)
        {
            if (campanna == null) return BadRequest("El cuerpo de la solicitud no puede estar vacío.");
            if (string.IsNullOrEmpty(campanna.Title)) return BadRequest("El título de la campaña es obligatorio.");
            if (campanna.Id < 0) return BadRequest("El id de la campana no puede ser nagativo.");
            if (string.IsNullOrEmpty(campanna.ContentCam)) return BadRequest("El contenido de la campaña es obligatorio.");
            if (campanna.ContentCam.Length > 5000) return BadRequest("El contenido de la campaña no puede exceder los 5000 caracteres.");
            try
            {
                var insertedCampaign = await logicCampaigns.InsertCampaignAsync(campanna);
                return Ok(insertedCampaign);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al intentar insertar la campaña: {ex.Message}");
            }
        }

        [HttpDelete("admin/campaigns/{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCampaignAsync(int id)
        {
            try
            {
                if (id <= 0) return NotFound(new { message = "No se elimino la campañas" });
                bool isDeleted = await logicCampaigns.DeleteCampaign(id);
                if (isDeleted) return Ok(new { message = "Campaña eliminada con éxito" });
                else return NotFound(new { message = "Campaña no encontrada" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al intentar eliminar la campaña: {ex.Message}");
            }
        }
        [HttpGet("admin/campaigns"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCampaigns()
        {
            try
            {
                var campaigns = await logicCampaigns.GetAllCampaignsAsync();
                return Ok(campaigns);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al intentar obtener las campañas: {ex.Message}");
            }

        }
        [HttpGet("admin/campaigns/top")]
        [AllowAnonymous]

        public async Task<IActionResult> GetTOP3Campaigns()
        {
            try
            {
                var campaigns = await logicCampaigns.GetTOP3CampaignsAsync();
                return Ok(campaigns);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al intentar obtener las campañas: {ex.Message}");
            }

        }

    }
}


