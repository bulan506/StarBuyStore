using MediatR;
using StoreApi.Commands;
using StoreApi.Models;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class CreateSinpeHandler : IRequestHandler<CreateSinpeCommand, Sinpe>
    {
        private readonly ISinpeRepository _sinpeRepository;

        public CreateSinpeHandler(ISinpeRepository sinpeRepository)
        {
            _sinpeRepository = sinpeRepository;
        }

        public async Task<Sinpe> Handle(CreateSinpeCommand command, CancellationToken cancellationToken)
        {
            var sinpe = new Sinpe()
            {
                UuidSales = command.UuidSales,
                ConfirmationNumber = command.ConfirmationNumber
            };

            return await _sinpeRepository.AddSinpeAsync(sinpe);
        }
    }
}