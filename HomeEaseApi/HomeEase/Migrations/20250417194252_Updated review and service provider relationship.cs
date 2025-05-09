using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Updatedreviewandserviceproviderrelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "Rating",
                table: "ServiceProviders");

            migrationBuilder.AddColumn<int>(
                name: "ReviewsId",
                table: "ServiceProviders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "18de215c-e468-4fbc-b125-f35276eba2eb", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "281ca06b-a480-4aee-ab6c-6f3016dc4e96", null, "Admin", "ADMIN" },
                    { "699458c6-f72a-4310-84fe-092051ec6109", null, "Customer", "CUSTOMER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_ServiceProviders_ServiceProviderId",
                table: "Reviews",
                column: "ServiceProviderId",
                principalTable: "ServiceProviders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_ServiceProviders_ServiceProviderId",
                table: "Reviews");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18de215c-e468-4fbc-b125-f35276eba2eb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "281ca06b-a480-4aee-ab6c-6f3016dc4e96");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "699458c6-f72a-4310-84fe-092051ec6109");

            migrationBuilder.DropColumn(
                name: "ReviewsId",
                table: "ServiceProviders");

            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "ServiceProviders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "17ce7471-f85e-4dcd-93c4-926f801b560b", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "4fa7d982-11da-4615-ada8-228761e18f15", null, "Customer", "CUSTOMER" },
                    { "e2e523c8-f990-4929-9fae-71616f8991cd", null, "Admin", "ADMIN" }
                });
        }
    }
}
