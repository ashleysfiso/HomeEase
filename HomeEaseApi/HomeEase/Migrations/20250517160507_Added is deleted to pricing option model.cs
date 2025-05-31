using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Addedisdeletedtopricingoptionmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PricingOptions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PricingOptions");
        }
    }
}
