using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class ReviewTableUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2580d1d3-0853-4391-a142-1fbfa9cfc357");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38270ff9-4487-4fb7-9a30-1e9c7a6e0deb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "855ab303-3195-4f2c-a743-cc2f8bd8c8b0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "342a2da1-9323-42cf-9c11-42277077503e", null, "Customer", "CUSTOMER" },
                    { "b0d1bd64-8da0-4ba9-af14-f078ea5458b2", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "b20d8b52-8ab9-4247-81e6-d42b77a5d70a", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ServiceProviderId_ServiceId",
                table: "Reviews",
                columns: new[] { "ServiceProviderId", "ServiceId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_ServiceOfferings_ServiceProviderId_ServiceId",
                table: "Reviews",
                columns: new[] { "ServiceProviderId", "ServiceId" },
                principalTable: "ServiceOfferings",
                principalColumns: new[] { "ServiceProviderId", "ServiceId" },
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_ServiceOfferings_ServiceProviderId_ServiceId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ServiceProviderId_ServiceId",
                table: "Reviews");

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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2580d1d3-0853-4391-a142-1fbfa9cfc357", null, "Customer", "CUSTOMER" },
                    { "38270ff9-4487-4fb7-9a30-1e9c7a6e0deb", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "855ab303-3195-4f2c-a743-cc2f8bd8c8b0", null, "Admin", "ADMIN" }
                });
        }
    }
}
