namespace UT;

public class ExceptionsTest
{


    public void Test()
    {

        //Claro, aquí tienes algunos ejemplos de manejo de excepciones en C#:

        //Try-Catch básico:
        try
        {
            // Código que podría lanzar una excepción
            int x = 10;
            int y = 0;
            int result = x / y; // Esto lanzará una excepción de división por cero
        }
        catch (Exception ex)
        {
            // Manejo de la excepción
            Console.WriteLine("Ocurrió una excepción: " + ex.Message);
        }
        //Try-Catch-Finally:
#pragma warning disable IDE0059 // Unnecessary assignment of a value
#pragma warning disable CS0168 // Variable is declared but never used
        try
        {
            // Código que podría lanzar una excepción
        }
        catch (Exception ex)
        {
            // Manejo de la excepción
        }
        finally
        {
            // Código que se ejecuta siempre, independientemente de si se lanzó una excepción o no
        }
#pragma warning restore CS0168 // Variable is declared but never used
#pragma warning restore IDE0059 // Unnecessary assignment of a value
        //Captura de excepciones específicas:
#pragma warning disable CS0168 // Variable is declared but never used
        try
        {
            // Código que podría lanzar una excepción
        }
        catch (DivideByZeroException ex)
        {
            // Manejo específico de la excepción de división por cero
        }
        catch (ArgumentException ex)
        {
            // Manejo específico de excepciones de argumento inválido
        }
        catch (Exception ex)
        {
            // Manejo de cualquier otra excepción no especificada
        }
#pragma warning restore CS0168 // Variable is declared but never used
                              //Lanzar una excepción personalizada:
        var condicion = false;
#pragma warning disable IDE0059 // Unnecessary assignment of a value
#pragma warning disable CS0168 // Variable is declared but never used
        try
        {
            // Código que verifica una condición
            if (condicion == false)
            {
                throw new MiExcepcion("La condición es falsa"); // Lanzar una excepción personalizada
            }
        }
        catch (MiExcepcion ex)
        {
            // Manejo de la excepción personalizada
        }
#pragma warning restore CS0168 // Variable is declared but never used
#pragma warning restore IDE0059 // Unnecessary assignment of a value


    }
}

class MiExcepcion : Exception
{
    public MiExcepcion(string? message) : base(message)
    {
    }
}