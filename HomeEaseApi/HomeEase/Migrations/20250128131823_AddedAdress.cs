using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class AddedAdress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "183158ef-2617-4343-8659-a9ce94e6b473");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ebc23e29-3ee5-448c-80c9-eb2a2abce9aa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec11dce5-54d8-4727-a138-dd8528674aff");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "62cbac71-e979-42ee-bfc0-251520e62281", null, "Admin", "ADMIN" },
                    { "ad90c442-9da6-4189-9737-90d828da87b8", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "e5d7c9b1-156e-40de-8888-2ccfaf717e7a", null, "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "62cbac71-e979-42ee-bfc0-251520e62281");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad90c442-9da6-4189-9737-90d828da87b8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e5d7c9b1-156e-40de-8888-2ccfaf717e7a");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Bookings");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "183158ef-2617-4343-8659-a9ce94e6b473", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "ebc23e29-3ee5-448c-80c9-eb2a2abce9aa", null, "Customer", "CUSTOMER" },
                    { "ec11dce5-54d8-4727-a138-dd8528674aff", null, "Admin", "ADMIN" }
                });
        }
    }
}
