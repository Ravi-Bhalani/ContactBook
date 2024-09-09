using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactBookApi.Migrations
{
    public partial class SeedCountry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
              table: "countries",
              column: "CountryName",
              values: new object[]
              {
                    "India",
                    "USA",
                    "UK",
                    "Switzerland",
                    "Itly"
              });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
               table: "countries",
               keyColumn: "CountryId",
               keyValues: new object[]
               {
                    1, 2, 3, 4, 5
               });

        }
    }
}