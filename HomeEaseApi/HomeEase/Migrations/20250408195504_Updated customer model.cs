using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Updatedcustomermodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "64486ef1-7563-41a5-8605-510544d37256");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fccfb6d-aa18-4131-aac6-9a71b82adba6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d01b20b7-a05e-44fd-a263-05789e7e1b10");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "64486ef1-7563-41a5-8605-510544d37256", null, "Customer", "CUSTOMER" },
                    { "8fccfb6d-aa18-4131-aac6-9a71b82adba6", null, "Admin", "ADMIN" },
                    { "d01b20b7-a05e-44fd-a263-05789e7e1b10", null, "ServiceProvider", "SERVICEPROVIDER" }
                });
        }
    }
}
