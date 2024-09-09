using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactBookApi.Migrations
{
    public partial class StoredProcedure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE OR ALTER PROCEDURE GETCONTACTBYBIRTHDATEMONTH
(@MONTH NVARCHAR(50))
AS
BEGIN
SELECT C.ContactId, C.FIRSTNAME,C.LASTNAME,C.Birthdate,C.PHONE,C.ADDRESS,C.EMAIL,C.GENDER,C.ISFAVOURITE,D.STATENAME,E.COUNTRYNAME,C.FILENAME,C.IMAGEBYTE
FROM CONTACTBOOK C
JOIN STATES D
ON C.STATEID = D.STATEID
JOIN COUNTRIES E
ON C.COUNTRYID = E.COUNTRYID
WHERE MONTH(BIRTHDATE) = @MONTH
END");
            migrationBuilder.Sql(@"CREATE OR ALTER PROCEDURE GetContactsCountBasedOnCountry
(
@countryId INT
)
AS
BEGIN
SELECT COUNT(ContactId) as CountOfContacts
FROM ContactBook 
Where CountryId = @countryId
END");
            migrationBuilder.Sql(@"CREATE OR ALTER PROCEDURE GETCONTACTBYSTATE
(@STATE INT)
AS
BEGIN
SELECT C.ContactId, C.FIRSTNAME,C.LASTNAME,C.Birthdate,C.PHONE,C.ADDRESS,C.EMAIL,C.GENDER,C.ISFAVOURITE,D.STATENAME,E.COUNTRYNAME,C.FILENAME,C.IMAGEBYTE
FROM CONTACTBOOK C
JOIN STATES D
ON C.STATEID = D.STATEID
JOIN COUNTRIES E
ON C.COUNTRYID = E.COUNTRYID

WHERE C.StateId = @STATE
END");
            migrationBuilder.Sql(@"CREATE OR ALTER PROCEDURE GetContactsCountBasedOnGender
(
@gender NVARCHAR(1)
)
AS
BEGIN
SELECT COUNT(ContactId) as CountOfContacts
FROM ContactBook 
Where Gender = @gender
END");


        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP PROCEDURE IF EXISTS GETCONTACTBYBIRTHDATEMONTH");
            migrationBuilder.Sql(@"DROP PROCEDURE IF EXISTS GetContactsCountBasedOnCountry");
            migrationBuilder.Sql(@"DROP PROCEDURE IF EXISTS GETCONTACTBYSTATE");
            migrationBuilder.Sql(@"DROP PROCEDURE IF EXISTS GetContactsCountBasedOnGender");



        }
    }
}
