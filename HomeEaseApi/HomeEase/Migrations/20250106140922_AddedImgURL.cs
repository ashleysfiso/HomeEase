using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class AddedImgURL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "342a2da1-9323-42cf-9c11-42277077503e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b0d1bd64-8da0-4ba9-af14-f078ea5458b2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b20d8b52-8ab9-4247-81e6-d42b77a5d70a");

            migrationBuilder.AddColumn<string>(
                name: "ImgURL",
                table: "ServiceOfferings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ed71bfa-380b-4856-9184-e981ecd26b27", null, "Customer", "CUSTOMER" },
                    { "96d80ba9-3de0-4ad4-84b3-ad1b12071a3d", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "ed7b08a9-065e-458b-a550-8ebc9bc3335a", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ed71bfa-380b-4856-9184-e981ecd26b27");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "96d80ba9-3de0-4ad4-84b3-ad1b12071a3d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ed7b08a9-065e-458b-a550-8ebc9bc3335a");

            migrationBuilder.DropColumn(
                name: "ImgURL",
                table: "ServiceOfferings");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "342a2da1-9323-42cf-9c11-42277077503e", null, "Customer", "CUSTOMER" },
                    { "b0d1bd64-8da0-4ba9-af14-f078ea5458b2", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "b20d8b52-8ab9-4247-81e6-d42b77a5d70a", null, "Admin", "ADMIN" }
                });
        }
    }
}
