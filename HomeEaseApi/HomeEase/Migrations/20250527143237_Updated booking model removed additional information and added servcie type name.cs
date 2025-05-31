using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Updatedbookingmodelremovedadditionalinformationandaddedservcietypename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdditionalInformation",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "ServiceTypeName",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ServiceTypeName",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "AdditionalInformation",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
