using System.IO;

public  class DirectionsStore
{
    private  string _cachedDirections;
    private  readonly object _lock = new object();

    public  string GetDirections()
    {
        if (_cachedDirections == null)
        {
            lock (_lock)
            {
                if (_cachedDirections == null)
                {
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Directions", "directions.json");
                    if (!System.IO.File.Exists(filePath))
                    {
                        throw new FileNotFoundException("El archivo directions.json no se encuentra.");
                    }
                    _cachedDirections = System.IO.File.ReadAllText(filePath);
                }
            }
        }
        return _cachedDirections;
    }
}
