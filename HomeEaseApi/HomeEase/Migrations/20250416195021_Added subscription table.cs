using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Addedsubscriptiontable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c260db9-a36d-4d5f-b9f3-566312833095");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a967299-3761-4f19-ac87-5fc8a7839be6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3b80ee0-5f80-4d38-9baf-b912df86558c");

            migrationBuilder.AddColumn<int>(
                name: "SubscriptionId",
                table: "ServiceProviders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ServiceProviderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_ServiceProviders_ServiceProviderId",
                        column: x => x.ServiceProviderId,
                        principalTable: "ServiceProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "17ce7471-f85e-4dcd-93c4-926f801b560b", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "4fa7d982-11da-4615-ada8-228761e18f15", null, "Customer", "CUSTOMER" },
                    { "e2e523c8-f990-4929-9fae-71616f8991cd", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_ServiceProviderId",
                table: "Subscriptions",
                column: "ServiceProviderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "17ce7471-f85e-4dcd-93c4-926f801b560b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4fa7d982-11da-4615-ada8-228761e18f15");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2e523c8-f990-4929-9fae-71616f8991cd");

            migrationBuilder.DropColumn(
                name: "SubscriptionId",
                table: "ServiceProviders");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3c260db9-a36d-4d5f-b9f3-566312833095", null, "Admin", "ADMIN" },
                    { "6a967299-3761-4f19-ac87-5fc8a7839be6", null, "Customer", "CUSTOMER" },
                    { "c3b80ee0-5f80-4d38-9baf-b912df86558c", null, "ServiceProvider", "SERVICEPROVIDER" }
                });
        }
    }
}
