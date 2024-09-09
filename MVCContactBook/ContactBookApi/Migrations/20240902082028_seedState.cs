using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactBookApi.Migrations
{
    public partial class seedState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
             table: "states",
             columns: new[] { "StateName", "CountryId", },
             values: new object[,]
             {
             { "Gujrat", 1 },
             { "Maharashtra", 1 },
             { "Karnataka", 1 },
             { "Punjab", 1 },
             { "Haryana", 1 },
             { "California", 2 },
             { "Colorado", 2 },
             { "Connecticut", 2 },
             { "Delaware", 2 },
             { "Florida", 2 },
             { "Greater London", 3 },
             { "South East", 3 },
            { "South West", 3 },
            { "East of England", 3 },
            { "Graubünden", 4 },
            { "Jura", 4 },
            { "Luzern", 4 },
            { "Neuchâtel", 4 },
            { "Trentino-Alto", 5 },
            { "Umbria", 5 },
            { "Valle d'Aosta", 5 },
            { "Veneto", 5 }
             });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
              table: "states",
              keyColumn: "StateId",
              keyValues: new object[]
              {
                    1, 2, 3, 4, 5,6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17, 18, 19, 20, 21, 22
              });

        }
    }
}
