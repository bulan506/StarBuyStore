using ApiLab7;

namespace UT;

public class CategoryTests
{
    [Test]
    public void CategoryWithIdZero_ThrowsArgumentException()
    {
        int category = 0;
        string name = "category";
        Assert.Throws<ArgumentException>(() => Category.Build(category, name));
    }

    [Test]
    public void CategoryWithNoName_ThrowsArgumentException()
    {
        int category = 1;
        string name = null;
        Assert.Throws<ArgumentException>(() => Category.Build(category, name));
    }

    [Test]
    public void CategoryWithNameFullOfWhiteSpaces_ThrowsArgumentException()
    {
        int category = 1;
        string name = "    ";
        Assert.Throws<ArgumentException>(() => Category.Build(category, name));
    }

    [Test]
    public void CategoryHasValidArguments_DoesNotThrowsArgumentException()
    {
        int category = 1;
        string name = "category";
        Assert.DoesNotThrow(() => Category.Build(category, name));
    }
}
