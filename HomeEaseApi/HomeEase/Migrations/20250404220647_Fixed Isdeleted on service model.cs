using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class FixedIsdeletedonservicemodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2598a214-2d6b-4995-85a9-896676c356ac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "97624ff1-1336-412c-8bf2-3cd66103f6fd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8452f5f-d321-484b-8650-b136ce66bf09");

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Services",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Services");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2598a214-2d6b-4995-85a9-896676c356ac", null, "Admin", "ADMIN" },
                    { "97624ff1-1336-412c-8bf2-3cd66103f6fd", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "c8452f5f-d321-484b-8650-b136ce66bf09", null, "Customer", "CUSTOMER" }
                });
        }
    }
}
