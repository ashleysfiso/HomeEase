using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Addedpendingaprovalstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0092543c-aa12-42e6-bf3b-d56015059587");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0bc0c148-fe55-48fb-a413-76842b8364c9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "81dfb1df-b752-4a87-a2ee-8d5d56a8dab5");

            migrationBuilder.CreateTable(
                name: "PendingApprovals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PendingApprovals", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2f8b8537-67e8-4c86-96c2-87fcb76bea28", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "4aa17028-7c72-4019-af3b-40720e9ae478", null, "Admin", "ADMIN" },
                    { "ad96e824-0b01-4f8a-bca4-9d3b3d8d8b7d", null, "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PendingApprovals");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2f8b8537-67e8-4c86-96c2-87fcb76bea28");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4aa17028-7c72-4019-af3b-40720e9ae478");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad96e824-0b01-4f8a-bca4-9d3b3d8d8b7d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0092543c-aa12-42e6-bf3b-d56015059587", null, "Admin", "ADMIN" },
                    { "0bc0c148-fe55-48fb-a413-76842b8364c9", null, "Customer", "CUSTOMER" },
                    { "81dfb1df-b752-4a87-a2ee-8d5d56a8dab5", null, "ServiceProvider", "SERVICEPROVIDER" }
                });
        }
    }
}
