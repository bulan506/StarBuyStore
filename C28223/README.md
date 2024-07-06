# :star: :shopping_cart: StarBuyStore


###  StarBuyStore : RESTful API for Purchases and Administration Products

## Project Description

The project focuses on developing a sophisticated RESTful API designed to manage diverse aspects of purchasing and product administration within an e-commerce framework. Key features include:

- **Product Management:** Ability to add, list, edit, and delete products seamlessly.
- **Payment Method Control:** Functionality to enable and disable payment methods based on administrative requirements.
- **Sales Reporting:** Generation of detailed daily and weekly sales reports.
- **Campaign Management:** Capability to create and manage promotional campaigns to engage customers effectively.
- **Security:** Implementation of robust token-based authentication to ensure secure access and operations for administrators.
- **Technology Stack:** Implemented in C#, .NET, utilizing Node.js and React for frontend development.

The API leverages efficient data handling techniques and structured data models to provide a reliable and scalable solution for e-commerce management. It is designed to enhance operational efficiency, streamline administrative tasks, and optimize customer engagement strategies.

---


**Administrator Features**

| Feature               |  Coded?       | Description                                            |
|-----------------------|:-------------:|--------------------------------------------------------|
| Add a Product         | &#10004;      | Ability to add a product in the system                 |
| List Products         | &#10004;      | Ability to list products                               |
| Delete a Product      | &#10004;      | Ability to delete a product                            |
| Create Campaigns for Customers | &#10004; | Ability to create promotional campaigns for customers  |
| Enable/Disable Payment Methods | &#10004; | Ability to manage the availability of payment methods  |
| Weekly Sales Reports  | &#10004;      | Generation of detailed weekly sales reports            |
| Daily Detailed Sales Reports | &#10004; | Generation of detailed daily sales reports            |

**Customer Features**

| Feature               |  Coded?       | Description                                            |
|-----------------------|:-------------:|--------------------------------------------------------|
| Create a Cart         | &#10004;      | Ability to create a new cart                           |
| View Cart             | &#10004;      | Ability to view the cart and its items                 |
| Add Item              | &#10004;      | Ability to add a new item to the cart                  |
| Remove Item           | &#10004;      | Ability to remove an item from the cart                |
| Checkout              | &#10004;      | Ability to proceed with payment                         |




# :closed_lock_with_key: Security Implementation

This project implements security using JSON Web Tokens (JWT) for authentication and authorization :

## API-side Configuration

The API uses JWT Bearer authentication, configured in the startup:

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
        options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "http://localhost:7223",
            ValidAudience = "http://localhost:7223",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                "TheSecretKeyNeedsToBePrettyLongSoWeNeedToAddSomeCha   rsHere"))
                };
            });

            builder.Services.AddSwaggerGen(setup =>
        {
            // Include 'SecurityScheme' to use JWT      Authentication
            var jwtSecurityScheme = new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Name = "JWT Authentication",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.     AuthenticationScheme,
                Description = "Put **_ONLY_** your JWT      Bearer token on textbox below!",

                Reference = new OpenApiReference
                {
                    Id = JwtBearerDefaults.     AuthenticationScheme,
                    Type = ReferenceType.SecurityScheme
                }
            };
            setup.AddSecurityDefinition(jwtSecurityScheme.      Reference.Id, jwtSecurityScheme);
            setup.AddSecurityRequirement(new        OpenApiSecurityRequirement
            {
                { jwtSecurityScheme, Array.Empty<string>() }
            });
        });
```
This configuration sets up JWT Bearer authentication and integrates it with [Swagger](https://swagger.io) for API documentation:

1. JWT Bearer Authentication Setup:
   - The `AddAuthentication` and `AddJwtBearer` methods configure the authentication middleware to use JWT Bearer tokens.
   - `TokenValidationParameters` are set to validate various aspects of the token:
     - `ValidateIssuer` and `ValidateAudience`: Ensures the token is issued and intended for this specific API.
     - `ValidateLifetime`: Checks if the token has expired.
     - `ValidateIssuerSigningKey`: Verifies the token's signature using the provided key.
   - The `ValidIssuer` and `ValidAudience` are set to "http://localhost:7223", which should be updated for production environments.
   - A `SymmetricSecurityKey` is created using a secret key. This key should be kept secure and not hard-coded in production.

2. Swagger Configuration for JWT:
   - `AddSwaggerGen` is used to configure Swagger, which provides API documentation.
   - A `OpenApiSecurityScheme` is defined to describe the JWT authentication:
     - It specifies the token format as "JWT".
     - Sets the location of the token to the header.
     - Uses the HTTP authentication scheme.
     - Provides a description for API users on how to input the token.
   - `AddSecurityDefinition` adds this security scheme to Swagger.
   - `AddSecurityRequirement` ensures that Swagger UI will require this token for authorized endpoints.

This configuration not only sets up JWT authentication for your API but also integrates it with Swagger, making it easier for API consumers (clients) to understand and test the authentication process. The Swagger UI will now include an option to input JWT tokens, allowing for authenticated requests directly from the Swagger interface.


## Authentication Controller

The `authController` class handles the authentication process, including user creation and login. Here's a breakdown of its key components:

```csharp
[Route("api/[controller]")]
[ApiController]
public class authController : ControllerBase
{
    private readonly IHostEnvironment hostEnvironment;
    public authController(IHostEnvironment hostEnvironment) 
    { 
        this.hostEnvironment = hostEnvironment; 
        createMockUsers(); 
    }

    private void createMockUsers()
    {
        if (!LoginDataAccount.listUsersData.Any())
        {
            new LoginDataAccount("bulan", "123456", new List<Claim> { new Claim(ClaimTypes.Name, "brandon"), new Claim(ClaimTypes.Role, "Admin") });
            new LoginDataAccount("crissYY", "23232334", new List<Claim> { new Claim(ClaimTypes.Name, "Cristian"), new Claim(ClaimTypes.Role, "User") });
            // ... more users ...
        }
    }

    [HttpPost]
    [AllowAnonymous]
   public async Task<IActionResult> LoginAsync([FromBody] LoginMod dataUserLog)
    {
    if (dataUserLog is null) return BadRequest("La información de inicio de sesión no está presente");
    var userLog = dataUserLog.userLog;
    var userPass = dataUserLog.passwordLog;
    if (userPass is null || string.IsNullOrEmpty(userPass)) return BadRequest($"La contraseña no puede ser nula o vacía.");
    if (userLog is null || string.IsNullOrEmpty(userLog)) return BadRequest($"El usuario no puede ser nulo o vacío.");
    if (hostEnvironment.IsDevelopment())
    {
        var userValid = false;
        var claimsUser = new List<Claim>();
        foreach (var thisUser in LoginDataAccount.listUsersData)
        {
            if (userLog == thisUser.user && userPass == thisUser.userPass)
            {
                claimsUser.AddRange(thisUser.listClaims);
                userValid = true;
                break;
            }
        }
        if (userValid)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, userLog) };
            claims.AddRange(claimsUser);
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("TheSecretKeyNeedsToBePrettyLongSoWeNeedToAddSomeCharsHere"));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:7223",
                audience: "http://localhost:7223",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signingCredentials
            );
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            if (tokenOptions.ValidTo < DateTime.UtcNow)
            {
                return Unauthorized("El token ha expirado");
            }
            return Ok(new ResponseAuthen { Token = token });
        }
}
```


**Key Points:**

**Controller Setup:**
- The class is decorated with `[Route("api/[controller]")]` and `[ApiController]` attributes, defining it as an API controller.
- It inherits from `ControllerBase`, providing base functionality for handling HTTP requests.

**Mock User Creation:**
- The `createMockUsers()` method is called in the constructor, populating a list of test users if it's empty.
- Each user is created with a username, password, and claims (including name and role).
- This setup is crucial for testing the authentication in a development environment.

**Login Endpoint:**
- The `LoginAsync` method is decorated with `[HttpPost]` and `[AllowAnonymous]`, allowing unauthenticated access.
- It accepts a `LoginMod` object containing user credentials.

**Authentication Process:**
- Validates the input data.
- Checks if the environment is Development.
- Verifies user credentials against the mock user list.
- If valid, creates a JWT token with user claims, including their role.
- Sets token expiration to 5 minutes.
- Returns the token in the response.


This controller implements the authentication logic that works in conjunction with the JWT configuration we discussed earlier. It provides a way to create test users and authenticate them, generating JWT tokens that can be used for subsequent authorized requests to the API.



## Client-Side Authentication Validation

The `LoginAdmin` component implements client-side authentication validation using React hooks and JWT (JSON Web Token) decoding. Here's a breakdown of the key aspects:

```jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Modal, Button } from 'react-bootstrap';

const LoginAdmin = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const URLConection = process.env.NEXT_PUBLIC_API;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const nowTime = Date.now() / 1000;
                if (decodedToken.exp > nowTime) {
                    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    if (userRole === "Admin") {
                        window.location.href = '/Admin/init';
                        return;
                    }
                } else {
                    setModalContent('Session expired. Please log in again.');
                    setShowModal(true);
                }
            } catch (error) {
                setModalContent('An error occurred during the login process. Please try again.');
                setShowModal(true);
            }
        }
    }, []);

    // ... rest of the component
    export default LoginAdmin;
};

```

#### Key Points:

- **JWT Decoding:** The `jwtDecode` function from the `jwt-decode` library is used to extract information from the JWT stored in the session storage (`sessionStorage.getItem('token')`).
- **Token Expiry Check:** The decoded JWT is checked to ensure it has not expired (`decodedToken.exp > nowTime`). If expired, a modal is shown indicating the session has expired.
- **Role-Based Access Control:** The JWT payload includes a role claim (`"http://schemas.microsoft.com/ws/2008/06/identity/claims/role"`). If the user role is "Admin", the user is redirected to `/Admin/init`.
- **Error Handling:** Errors during JWT decoding or other authentication processes are caught and displayed in a modal for user notification.

This client-side implementation ensures that only authenticated users with valid JWT tokens and appropriate roles can access restricted areas of the application. It provides a seamless user experience by managing sessions and handling errors gracefully.

#### Access Control with Roles and Authentication

In this example, access to the `GetCampaigns` endpoint is restricted to users with the "Admin" role. This ensures that only authenticated users with administrative privileges can retrieve campaign data.

```csharp
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
        return StatusCode(500, $"An error occurred while trying to fetch campaigns: {ex.Message}");
    }
}
```

#### Explanation:

- **Authorization Attribute:** The `[Authorize(Roles = "Admin")]` attribute specifies that only users authenticated with the "Admin" role can access the `GetCampaigns` endpoint.
- **Role-Based Access Control:** This mechanism ensures that unauthorized users attempting to access this endpoint will receive an unauthorized (401) response.
- **Error Handling:** If an exception occurs during the retrieval of campaigns, a server error (500) response is returned with details of the error.

This setup enhances security by enforcing role-based access control (RBAC) using ASP.NET Core's authorization mechanisms. It prevents unauthorized access to sensitive administrative endpoints, maintaining data integrity and application security.




# :package: Product Cache Implementation

The product cache in the provided code is managed through the `Products` instance within the `Store` class:

## Initialization and Loading of Products

- The product cache is loaded during the initialization of the `Store` class in the private constructor:
  ```csharp
  private Store(IEnumerable<Product> productsList, int taxPercentage, IEnumerable<Category> category, Products productsInstance)
  {
      if (productsList == null || productsList.Count() == 0) throw new ArgumentNullException($"The product list {nameof(productsList)} cannot be null.");
      if (taxPercentage < 1 || taxPercentage > 100) throw new ArgumentOutOfRangeException($"The tax percentage {nameof(taxPercentage)} must be in the range of 1 to 100.");
      if (category == null || category.Count() == 0) throw new ArgumentNullException($"The category list {nameof(category)} cannot be null.");
      if (productsInstance == null) throw new ArgumentNullException($"The instance of {nameof(productsInstance)} cannot be null.");
      directionsStore = new DirectionsStore();
      this.Products = productsList;
      this.TaxPercentage = taxPercentage;
      this.Categories = category;
      this.ProductsInstance = productsInstance;
  }
  ```
  - Here, `this.Products` stores the product list which acts as the cache.

## `GetInstanceAsync` Method

- This method ensures that the `Store` instance is initialized with the product list loaded from the database:
  ```csharp
  public static async Task<Store> GetInstanceAsync()
  {
      Products products = await new Products().GetInstanceAsync();
      var productsInstance = products;
      if (productsInstance == null || productsInstance.GetAllProducts().Count() == 0) throw new ArgumentException($"The instance {nameof(productsInstance)} cannot be null.");
      return new Store(productsInstance.GetAllProducts(), 13, productsInstance.GetCategory(), productsInstance);
  }
  ```

## Singleton Method `Instance`

- This method ensures there is only one instance of `Store` in the application:
  ```csharp
  private static readonly Lazy<Task<Store>> instance = new Lazy<Task<Store>>(GetInstanceAsync);
  public static Task<Store> Instance => instance.Value;
  ```

## Handling Products in the Cache

- Adding new products:
  ```csharp
  internal void setNewProduct(Product newProduct)
  {
      if (newProduct == null) throw new ArgumentNullException($"{nameof(newProduct)} cannot be null.");
      var updatedProducts = new List<Product>(Products) { newProduct };
      var productsInstance = ProductsInstance;
      productsInstance.setNewProductList(updatedProducts); 
      Products = updatedProducts; 
  }
  ```
- Deleting products:
  ```csharp
  internal void deleteProductByIDlist(int productID)
  {
      if (productID <= 0) throw new ArgumentException($"The product ID {nameof(productID)} cannot be zero or negative.");
      var instanceProducts = ProductsInstance;
      var productList = Products.OrderBy(p => p.id).ToList();
      int index = instanceProducts.BinarySearch(productList, productID);
      if (index >= 0)
      {
          productList[index].deleted = 1;
          Products = productList;
          instanceProducts.setNewProductList(Products);
      }
      else throw new ArgumentException($"No product found with ID {productID} in the list.");
  }
  ```




#### Importance of Using Binary Search for Deletion

Using binary search to delete a product is important for several reasons:

#### 1. **Time Efficiency**

Binary search is significantly faster than linear search, especially for large lists. The time complexity of binary search is \(O(\log n)\) compared to \(O(n)\) for linear search.

In the `deleteProductByIDlist` method, the product list is first sorted by product ID, and then binary search is used to find the index of the product to delete:

```csharp
var productList = Products.OrderBy(p => p.id).ToList();
int index = instanceProducts.BinarySearch(productList, productID);
```

#### 2. **Data Consistency**

Sorting the list and using binary search ensures that we are working with a consistently ordered list, which is crucial for maintaining data integrity and avoiding errors during product deletion or update.

#### 3. **Error Handling**

Binary search provides a more precise and efficient way to determine if a product with a specific ID exists in the list. This helps in handling errors more effectively by throwing an exception if the product is not found:

```csharp
if (index >= 0)
{
    productList[index].deleted = 1;
    Products = productList;
    instanceProducts.setNewProductList(Products);
}
else throw new ArgumentException($"No product found with ID {productID} in the list.");
```

#### 4. **Efficient Cache Update**

After finding the index of the product to delete, updating the product list and the `Products` instance is more straightforward and efficient. This ensures that both the internal cache of the `Store` class and the `Products` instance remain synchronized:

```csharp
productList[index].deleted = 1;
Products = productList;
instanceProducts.setNewProductList(Products);
```

### Importance of Singleton Pattern


The Singleton pattern is crucial in this implementation for several reasons:

1.**Data Consistency**:
   - Ensures that the product list (cache) is consistent and synchronized across the application, preventing concurrency issues and inconsistent data.

2.**Efficiency**:
   - Creating a `Store` instance is costly due to the need to load product and category data. Using a Singleton ensures this operation is performed only once, improving resource efficiency.

3.**Centralized Control**:
   - All product-related operations (additions, deletions, searches) are handled through a single instance, making it easier to control and manage this data.

4.**Ease of Maintenance**:
   - With a single instance, it is easier to maintain and update the code related to product management. Changes are made in one place and reflected throughout the application.


# :mag: Product Search Implementation

This section explains how the product search functionality is implemented in the `Products` class, utilizing a binary search tree.

### Project Structure

The code is divided into several classes and methods that interact to allow efficient product search in a store:

1. **`Product`**: A class representing a product with its properties.
2. **`BinarySearch`**: A class representing a node in the binary search tree.
3. **`BinarySearchTree`**: A class implementing the binary search tree.
4. **`Products`**: The main class managing products and search functionalities.

### Binary Search Tree Implementation

#### `BinarySearch` Class

This class represents a node in the binary search tree. Each node contains a product and references to the left (`izq`) and right (`der`) child nodes.

```csharp
public class BinarySearch
{
    public Product Product { get; private set; }
    public BinarySearch izq { get; set; }
    public BinarySearch der { get; set; }

    public BinarySearch(Product product)
    {
        if (product == null) throw new ArgumentNullException($"Product {nameof(product)} cannot be null.");
        if (string.IsNullOrEmpty(product.name)) throw new ArgumentException("Product name cannot be empty.", nameof(product));
        Product = product;
    }
}
```

#### `BinarySearchTree` Class

This class implements the binary search tree operations, such as inserting and searching for products.

1. **Inserting Products**

   The `InsertProduct` method inserts a product into the tree by comparing product names to maintain the tree's order.

    ```csharp
    public void InsertProduct(Product product)
    {
        if (product == null) throw new ArgumentNullException($"Product {nameof(product)} cannot be null.");
        if (string.IsNullOrEmpty(product.name)) throw new ArgumentException($"Product name {nameof(product)} cannot be empty.");
        product.name = product.name.ToLower();
        raiz = InsertProductTree(raiz, product);
    }

    private BinarySearch InsertProductTree(BinarySearch head, Product product)
    {
        if (head == null) return new BinarySearch(product);
        int comparationString = string.Compare(product.name, head.Product.name);
        if (comparationString < 0) head.izq = InsertProductTree(head.izq, product);
        else if (comparationString > 0) head.der = InsertProductTree(head.der, product);
        return head;
    }
    ```

2. **Searching for Products**

   The `Search` method looks for products whose name or description contains the search text. It traverses the binary search tree to find matching products.

    ```csharp
    public IEnumerable<Product> Search(string textToSearch)
    {
        if (string.IsNullOrEmpty(textToSearch)) throw new ArgumentException($"Search text {nameof(textToSearch)} cannot be empty.");
        List<Product> productsFound = new List<Product>();
        Search(productsFound, textToSearch.ToLower(), raiz);
        return productsFound;
    }

    private void Search(List<Product> loadedProducts, string textToSearch, BinarySearch head)
    {
        if (head == null) { return; }
        if (loadedProducts == null) throw new ArgumentNullException($"Product list {nameof(loadedProducts)} cannot be null.");
        if (string.IsNullOrEmpty(textToSearch)) throw new ArgumentException($"Search text {nameof(textToSearch)} cannot be empty.");

        bool hasName = !string.IsNullOrEmpty(head.Product.name);
        bool nameContainsText = hasName && head.Product.name.ToLower().Contains(textToSearch);
        if (nameContainsText) { loadedProducts.Add(head.Product); }

        bool hasDescription = !string.IsNullOrEmpty(head.Product.description);
        bool descriptionContainsText = hasDescription && head.Product.description.ToLower().Contains(textToSearch);
        if (descriptionContainsText) { loadedProducts.Add(head.Product); }

        Search(loadedProducts, textToSearch, head.izq);
        Search(loadedProducts, textToSearch, head.der);
    }
    ```

### `Products` Class

This class is responsible for managing products and providing methods for searches.

#### Initialization

The constructor initializes necessary data structures and fills the binary search tree with products.

```csharp
public Products(IEnumerable<Product> allProducts, Dictionary<int, List<Product>> productsByCategory, IEnumerable<Category> categories)
{
    if (allProducts == null || allProducts.Count() == 0) throw new ArgumentNullException($"Product list {nameof(allProducts)} cannot be null.");
    if (productsByCategory == null || productsByCategory.Count() == 0) throw new ArgumentNullException($"Product dictionary by category {nameof(productsByCategory)} cannot be null.");
    if (categories == null || categories.Count() == 0) throw new ArgumentNullException($"Category list {nameof(categories)} cannot be null.");
    this.allProducts = allProducts;
    this.productsByCategory = productsByCategory;
    this.Category = categories;
    this.TreeSearch = new BinarySearchTree();
    this.logicProduct = new LogicProduct();
    foreach (var product in allProducts)
    {
        TreeSearch.InsertProduct(product);
    }
}
```

#### Search Methods

1. **Search by Text**

   This method searches for products in the binary search tree that contain the search text in their name or description.

    ```csharp
    public IEnumerable<Product> SearchByText(string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText)) throw new ArgumentException($"Search text {nameof(searchText)} cannot be empty or null.");
        return TreeSearch.Search(searchText);
    }
    ```

2. **Search by Text and Category**

   This method filters products by categories and then performs the search on the filtered subset.

    ```csharp
    public IEnumerable<Product> SearchByTextAndCategory(string searchText, List<int> categoryIds)
    {
        bool isSearchTextEmptyOrNull = string.IsNullOrWhiteSpace(searchText);
        bool areCategoryIdsNull = categoryIds == null;
        bool areCategoryIdsEmpty = !areCategoryIdsNull && !categoryIds.Any();
        bool isInvalidInput = isSearchTextEmptyOrNull || areCategoryIdsNull || areCategoryIdsEmpty;
        if (isInvalidInput) throw new ArgumentException("Search text cannot be empty or null, and category ID list cannot be empty or null.");

        foreach (var categoryId in categoryIds)
        {
            if (categoryId < 1) throw new ArgumentException($"Category ID {categoryId} cannot be negative or zero.");
        }
        var filteredProducts = new List<Product>();
        foreach (var categoryId in categoryIds)
        {
            if (productsByCategory.TryGetValue(categoryId, out var productsFound))
            {
                filteredProducts.AddRange(productsFound);
            }
        }
        if (filteredProducts == null || !filteredProducts.Any())
        {
            return filteredProducts;
        }
        var treeByCategories = new BinarySearchTree();
        foreach (var product in filteredProducts)
        {
            treeByCategories.InsertProduct(product);
        }
        var productsFilter = treeByCategories.Search(searchText);
        return productsFilter;
    }
    ```

 
#### Reason for Using Dictionary and Binary Search Tree

#### Dictionary for Categorization

The use of a dictionary allows for efficient categorization of products. Each category ID maps to a list of products belonging to that category. This structure provides:

1. **Quick Access**: Fast retrieval of products by category ID using the dictionary's O(1) average-time complexity for lookups.
2. **Organization**: Maintains a clear and structured organization of products, making it easy to manage and search within specific categories.

#### Binary Search Tree for Text Search

The binary search tree (BST) is used for efficient text-based searches within product names and descriptions. The BST offers several advantages:

1. **Efficiency**: Provides O(log n) average-time complexity for insertion and search operations, making it suitable for handling large datasets.
2. **Sorted Data**: Automatically maintains products in a sorted order based on their names, facilitating quick and efficient search operations.
3. **Versatility**: Allows for flexible search criteria, such as partial matches within product names and descriptions.

### Combined Use Case

By combining a dictionary and a binary search tree, the implementation achieves a balance of quick category-based filtering and efficient text-based searching. Here's how these structures complement each other:

1. **Filtering by Category**: Use the dictionary to quickly retrieve all products within specified categories.
2. **Searching by Text**: Use the binary search tree to efficiently search through product names and descriptions for the specified text.

This dual-structure approach ensures that both category-based filtering and text-based searching are handled efficiently, providing a robust and scalable solution for managing and searching products.



## Implementation Details of Sales Reports for Admin

#### Logic Class (`LogicSalesReportsApi`)

The `LogicSalesReportsApi` class orchestrates the logic for generating daily and weekly sales reports. It utilizes `SaleDataBase` to interact with the database and fetch necessary data.

```csharp
public sealed class LogicSalesReportsApi
{
     private readonly SaleDataBase saleDataBase = new SaleDataBase();
     public LogicSalesReportsApi() {}

        public async Task<SalesReport> GetSalesReportAsync(DateTime date)
        {
            // Parameter validations
            if (date == null) { throw new ArgumentException($"The variable {nameof(date)} cannot be empty or null."); }
            if (date > DateTime.Now) { return new SalesReport(); }
            if (date == DateTime.MinValue || date == DateTime.MaxValue) { throw new ArgumentException($"The variable {nameof(date)} cannot be DateTime.MinValue or DateTime.MaxValue."); }

            // Fetch sales data by date and weekly summary
            Task<IEnumerable<SalesData>> salesByDateTask = saleDataBase.GetSalesByDateAsync(date);
            Task<IEnumerable<SaleAnnotation>> salesWeekTask = saleDataBase.GetSalesWeekAsync(date);

            // Wait for both tasks to complete concurrently
            await Task.WhenAll(salesByDateTask, salesWeekTask);

            IEnumerable<SalesData> listSales = await salesByDateTask;
            IEnumerable<SaleAnnotation> weekSales = await salesWeekTask;

            return new SalesReport(listSales, weekSales);
        }
    }
}
```

**Key Points**
- **`LogicSalesReportsApi`**: This class encapsulates the logic for retrieving and processing sales reports.
- **`GetSalesReportAsync`**: This asynchronous method takes a `DateTime` parameter and returns a `Task` of type `SalesReport`. It first validates the date parameter and then asynchronously fetches data from two database queries.
- **`Task.WhenAll(salesByDateTask, salesWeekTask)`**: This line ensures that both `salesByDateTask` and `salesWeekTask` execute concurrently to optimize waiting time. Executing both queries in parallel improves overall response time.
- **`SalesReport`**: After both tasks complete, the results are used to create a `SalesReport` instance, which is then returned.

#### Sales Report Class (`SalesReport`)

The `SalesReport` class encapsulates daily and weekly sales data fetched by `LogicSalesReportsApi`.

```csharp
using System.Collections.Generic;

namespace storeApi.Models
{
    public class SalesReport
    {
        public IEnumerable<SalesData> Sales { get; private set; }
        public IEnumerable<SaleAnnotation> SalesDaysWeek { get; private set; }

        public SalesReport() { }

        public SalesReport(IEnumerable<SalesData> sales, IEnumerable<SaleAnnotation> salesDaysWeek)
        {
            if (sales == null) { throw new ArgumentException($"The parameter {nameof(sales)} cannot be null."); }
            if (salesDaysWeek == null) { throw new ArgumentException($"The parameter {nameof(salesDaysWeek)} cannot be null."); }

            this.Sales = sales;
            this.SalesDaysWeek = salesDaysWeek;
        }
    }
}
```

**Key Points**
- **`SalesReport`**: This class represents the result of sales reports. It has two properties: `Sales` for daily sales (`SalesData`) and `SalesDaysWeek` for a weekly summary (`SaleAnnotation`).
- **Constructors**: The class has two constructors, one without parameters and another that initializes the `Sales` and `SalesDaysWeek` properties with provided values. It validates that the data is not null.

### Database Operations (`SaleDataBase`)

The `SaleDataBase` class handles database queries to fetch specific sales data by date and weekly summary.

```csharp
public class SaleDataBase
{
 public async Task<IEnumerable<SalesData>> GetSalesByDateAsync(DateTime date)
        {
            // Query to fetch sales by date
            List<SalesData> salesList = new List<SalesData>();
            using (MySqlConnection connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connection.OpenAsync();
                string query = @"
                    SELECT s.purchase_date, s.total, s.purchase_id, SUM(ls.quantity) AS total_quantity, GROUP_CONCAT(CONCAT(p.name, ':', ls.quantity)) AS products
                    FROM sales s
                    INNER JOIN linesSales ls ON s.purchase_id = ls.purchase_id
                    INNER JOIN products p ON ls.product_id = p.id
                    WHERE DATE(s.purchase_date) = DATE(@purchase_date)
                    GROUP BY s.purchase_id, s.purchase_date, s.total";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@purchase_date", date);

                    using (MySqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            DateTime purchaseDate = reader.GetDateTime("purchase_date");
                            decimal total = reader.GetDecimal("total");
                            string purchaseId = reader.GetString("purchase_id");
                            int totalQuantity = reader.GetInt32("total_quantity");
                            string productsString = reader.GetString("products");
                            List<ProductQuantity> products = productsString.Split(',')
                                .Select(p => new ProductQuantity(p.Split(':')[0], int.Parse(p.Split(':')[1])))
                                .ToList();
                            SalesData salesData = new SalesData(purchaseDate, purchaseId, total, totalQuantity, products);
                            salesList.Add(salesData);
                        }
                    }
                }
            }
            return salesList;
        }

        public async Task<IEnumerable<SaleAnnotation>> GetSalesWeekAsync(DateTime date)
        {
            // Query to fetch weekly sales summary
            List<SaleAnnotation> salesByDay = new List<SaleAnnotation>();
            using (MySqlConnection connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connection.OpenAsync();
                string query = @"
                            SELECT DAYNAME(s.purchase_date) AS day, SUM(s.total) AS total
                            FROM sales s
                            WHERE YEARWEEK(s.purchase_date) = YEARWEEK(@purchase_date)
                            GROUP BY DAYNAME(s.purchase_date)";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@purchase_date", date);

                    using (MySqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            string dayName = reader.GetString("day");
                            DayOfWeek dayOfWeek = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), dayName, true);
                            decimal total = reader.GetDecimal("total");
                            salesByDay.Add(new SaleAnnotation(dayOfWeek, total));
                        }
                    }
                }
            }
            return salesByDay;
        }
    }
}
```

**Key Points**
- **`SaleDataBase`**: This class manages database queries to fetch sales-related data.
- **`GetSalesByDateAsync` and `GetSalesWeekAsync` Methods**: These asynchronous methods retrieve specific sales data:
  - **`GetSalesByDateAsync`**: Fetches detailed sales data for a specific date, including purchased products.
  - **`GetSalesWeekAsync`**: Calculates a weekly summary of sales by day of the week.

### Controller (`SalesController`)

The `SalesController` defines an endpoint to generate sales reports and handles administrator authentication.

```csharp
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using storeApi.Models;

namespace storeApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        internal readonly LogicSalesReportsApi lsr = new LogicSalesReportsApi();

        [HttpGet("sales/date")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateReportSales(DateTime date)
        {
            try
            {
                // Generate sales report using defined logic
                SalesReport report = await lsr.GetSalesReportAsync(date);
                return Ok(report);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
```

**Explanation:**
- **`SalesController`**: This controller defines a RESTful endpoint (`GET api/sales/date`) to generate sales reports.
- **Annotations**:
  - **`[Route("api/")]`**: Defines the base route for all actions in the controller.
  - **`[ApiController]`**: Indicates that the controller responds to HTTP web API requests.
- **`CreateReportSales`**: This method handles HTTP GET requests to generate a sales report.
  - **Authorization**: Only roles with `"Admin"` permissions can access this endpoint.
  - **`LogicSalesReportsApi`**: Uses an instance of this class to generate the sales report.
  - **Error Handling**: Catches and returns errors if the provided date is invalid.

### Explanation of `await Task.WhenAll(salesByDateTask, salesWeekTask)`

In `LogicSalesReportsApi`, `await Task.WhenAll(salesByDateTask, salesWeekTask);` is used to asynchronously await the completion of two tasks: `salesByDateTask` and `salesWeekTask`. This allows both database queries to execute concurrently, rather than waiting for one to finish before starting the other. This approach optimizes the overall response time of the `GetSalesReportAsync` method by leveraging parallelism for improved performance.

### SalesCharAdmin Component Explanation

The `SalesCharAdmin` component in this code manages the display of sales details for administrators:

#### Component and State Management

```javascript
const SalesCharAdmin = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default date: today
  const [salesData2, setSalesData2] = useState([['Datetime', 'Purchase Number', 'Price', 'Amount of Products', { role: 'annotation' }]]);
  const [weeklySalesData, setWeeklySalesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [charge, setCharge] = useState(false);
  var dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const URLConnection = process.env.NEXT_PUBLIC_API;
```

- **Description**: The `SalesCharAdmin` component utilizes React's state management (`useState`) for handling the selected date (`selectedDate`), daily sales data (`salesData2`), weekly sales data (`weeklySalesData`), and modal visibility (`showModal`, `showModal2`). It also manages a flag (`charge`) for triggering data updates.

#### useEffect for Data Fetching

```javascript
  useEffect(() => {
    var token = sessionStorage.getItem("token");
    if (!token) {
      setShowModal2(true);
      return;
    }
    fetchData(token); // Initial data fetch on component mount or when selectedDate or charge changes
  }, [selectedDate, charge]);
```

- **Description**: The `useEffect` hook fetches data when the component mounts or when `selectedDate` or `charge` changes. It checks for a session token (`token`) and displays a modal (`showModal2`) if no token is found.

#### fetchData Function for Data Retrieval

```javascript
  const fetchData = async (token) => {
    try {
      // Token validation
      if (token) {
        const decodedTokenStorage = jwtDecode(token);
        const nowTime = Date.now() / 1000;
        if (decodedTokenStorage.exp < nowTime) {
          setShowModal2(true);
          sessionStorage.removeItem("token");
          return;
        }
      }

      // Fetching sales data
      const response = await fetch(URLConnection + `/api/sales/date?date=${selectedDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      });

      // Server response handling
      if (response.status === 403 || response.status === 401) {
        setShowModal2(true);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        var salesAreEmpty = data.sales === null || data.sales.length === 0;
        var weekSalesAreEmpty = data.salesDaysWeek === null || data.salesDaysWeek.length === 0;

        // Updating state based on response
        if (salesAreEmpty && weekSalesAreEmpty) {
          setShowModal(true);
          setCharge(true);
          setSalesData2(data);
        } else {
          if (salesAreEmpty) {
            setShowModal(true);
            updateSalesData2(data);
          }
          const weeklyData = [['Week', 'Sales']];
          data.salesDaysWeek.forEach(day => {
            var dayOfWeekNumber = day.dayOfWeek;
            var dayIndex = (dayOfWeekNumber - 1 + 7) % 7;
            weeklyData.push([dayNames[dayIndex], day.total]);
          });
          updateSalesData2(data);
          setWeeklySalesData(weeklyData);
          setCharge(false);
        }
      } else {
        throw new Error('Error fetching sales data');
      }
    } catch (error) {
      throw new Error('Fetch error while retrieving sales data');
    }
  };
```

- **Description**: The `fetchData` function asynchronously fetches sales data based on the selected date (`selectedDate`). It validates the session token, handles server responses, and updates component states (`salesData2`, `weeklySalesData`, `showModal`, `charge`) accordingly. It manages visibility of modals for authentication errors (`showModal2`) and data availability (`showModal`).

#### Explanation of Administrator Flow

1. **Date Selection**: `selectedDate` determines the date for which sales data is requested.
2. **Token Authentication**: Validates the existence and validity of the session token (`token`).
3. **Data Fetching**: Sends a GET request to the API server (`URLConnection`) to fetch sales data for `selectedDate`.
4. **Response Handling**:
   - Displays modals (`showModal`, `showModal2`) based on token validity and data availability.
   - Updates `salesData2` with daily sales data and `weeklySalesData` with weekly sales data for visualization.

This flow enables administrators to view and manage detailed daily and weekly sales data securely and efficiently.






### Usage of Delegates in the Project

Delegates are employed to encapsulate and pass specific behaviors between classes and methods, offering flexibility and code reuse.

#### Defined Delegates

Within the `LogicProduct` class, two delegates are defined to handle product-related operations:

```csharp
internal delegate void SetNewProductDelegate(Product product);
internal delegate void DeleteProductDelegate(int productID);
```

These delegates allow the definition of method signatures that can be assigned and dynamically invoked to perform actions such as adding a new product or deleting an existing one.

#### Implementation in Methods

##### Method `AddNewProductAsync`

The `AddNewProductAsync` method utilizes the `SetNewProductDelegate` delegate to manage the logic for adding a new product:

```csharp
public async Task AddNewProductAsync(NewProductData newProduct)
{
    //...
    await productDatabase.SaveNewProductAsync(newProduct, newProductDel);
}
```

Here, `newProductDel` represents the lambda function encapsulating the logic to add a product. This delegate is passed as an argument to the `SaveNewProductAsync` method of the `productDatabase` object.

##### Method `DeleteProductByID`

The `DeleteProductByID` method employs the `DeleteProductDelegate` delegate to handle the logic for deleting a product by its ID:

```csharp
public bool DeleteProductByID(int idProduct)
{
    //...
    return productDatabase.DeleteProductByID(idProduct, deleteProductDel);
}
```

In this case, `deleteProductDel` encapsulates the logic to mark a product as deleted in the database. This delegate is passed as an argument to the `DeleteProductByID` method of the `productDatabase` object.

#### Advantages of Delegates

Delegates facilitate the decoupling of business logic from implementing classes, enhancing modularity and code reusability. They provide a flexible mechanism to dynamically handle specific actions within the application.

### :test_tube: Unit Testing with NUnit

The application has undergone comprehensive testing using the NUnit unit testing framework in C#, [NUnit Documentation](https://docs.nunit.org/articles/nunit/intro.html). Special emphasis has been placed on testing purchase-related methods to ensure their functionality and reliability within the system.



# Demo


## Authors


- [@bulan506](https://www.github.com/bulan506) , I'm a student at the University of Costa Rica (UCR), currently enrolled in the course IF4101 "Languages for Commercial Applications."


### Project Package Diagram

![Project-Packages](imgSource/PacketsProject.jpg)

This diagram illustrates the modular structure of the application, showcasing how different layers or modules are organized within the project. It provides a visual representation of various components and their interdependencies, aiding in understanding the overall architecture and system design.

### Frontend Package Diagram

![Frontend-Packages](imgSource/PackageFrontEnd.jpg)

The frontend package diagram describes the organization of modules and specific components within the application's frontend. It highlights the structure and interrelationships of different frontend functionalities, such as user interfaces, components, and services. This diagram helps in understanding the frontend architecture and the distribution of responsibilities among frontend modules.

### Backend Package Diagram

![Backend-Packages](imgSource/PackageBACKEND.jpg)

The backend package diagram displays the structural arrangement of modules and components within the application's backend. It illustrates the organization of backend services, databases, APIs, and other components supporting the business logic and data processing functionalities of the application. This diagram aids in visualizing the backend architecture and understanding relationships among different backend modules.

### Activity Diagram, Store Administrator Campaigns

![Activity-Diagram-Campaigns](imgSource/campaigns.jpg)

This activity diagram depicts the sequence of actions and interactions involved in managing store administrator campaigns. It visualizes the workflow and processes, including user interactions, system operations, and decision points related to the creation, monitoring, and management of promotional campaigns within the application. The diagram provides insight into the operational flow of campaign management activities, including integrations with socket-based communication for real-time updates.



