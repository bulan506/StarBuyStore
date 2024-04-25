using MediatR;

namespace StoreApi.Commands
{
    public class DeleteProductCommand : IRequest<int>
    {
        public Guid Uuid { get; set; }
    }
}