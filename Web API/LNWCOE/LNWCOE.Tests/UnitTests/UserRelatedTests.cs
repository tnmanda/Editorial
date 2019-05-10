using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using LNWCOE.Helpers.Admin;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Xunit;

namespace LNWCOE.Tests.UnitTests
{
    public class UserRelatedTests : TestBase, IDisposable
    {
        private DbContextOptions<AppDbContext> options;
        private IConfiguration _configuration;

        public UserRelatedTests()
        {
            _configuration = conf;
            options = opt;
            PopulateData();
        }

        [Fact]
        public void AppUserAbsence()
        {
            ILogger<AppUserAbsenceController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserAbsenceController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserAbsence>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserAbsence>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("absence type 1", result1.Notes);

                // test update 
                var pg1 = new AppUserAbsence { AppUserAbsenceID = 1, Notes = "absence type 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("absence type 1", result3.Notes);
                Assert.Equal("absence type 1 upd", result3.Notes);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("absence type 2", result4.Notes);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
            
        }
        
        [Fact]
        public void AppUserAddress()
        {
            ILogger<AppUserAddressController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserAddressController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserAddress>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserAddress>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("address type 1", result1.Address1);
                // test update 
                var pg1 = new AppUserAddress { AppUserAddressID = 1, Address1 = "address type 1 upd" , CountryID = 1, AddressTypeID = 1};
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("address type 1", result3.Address1);
                Assert.Equal("address type 1 upd", result3.Address1);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("address type 2", result4.Address1);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);

            }
        }

        [Fact]
        public void AppUserCertificate()
        {
            ILogger<AppUserCertificateController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserCertificateController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserCertificate>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserCertificate>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserCertificate { AppUserCertificateID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }
        
        [Fact]
        public void AppUserContact()
        {
            ILogger<AppUserContactController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserContactController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserContact>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserContact>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserContact { AppUserContactID = 1, ContactTypeID=1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserContract()
        {
            ILogger<AppUserContractController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserContractController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserContract>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserContract>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserContract { AppUserContractID = 1, ContractTypeID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserCountry()
        {
            ILogger<AppUserCountryController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserCountryController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserCountry>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserCountry>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserCountry { AppUserCountryID = 1, CountryID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserEducation()
        {
            ILogger<AppUserEducationController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserEducationController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserEducation>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserEducation>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserEducation { AppUserEducationID = 1, EducationTypeID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserEmploymentRecord()
        {
            ILogger<AppUserEmploymentRecordController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserEmploymentRecordController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserEmploymentRecord>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserEmploymentRecord>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserEmploymentRecord { AppUserEmploymentRecordID = 1, ContractTypeID = 1, DepartureTypeID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserFunction()
        {
            ILogger<AppUserFunctionController> _testlogger = null;

            using (var context = new AppDbContext(options, null))

            {
                var controller = new AppUserFunctionController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserFunction>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserFunction>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserFunction { AppUserFunctionID = 1, FunctionTypeID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
               //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserInRole()
        {
            ILogger<AppUserInRoleController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserInRoleController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserInRole>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserInRole>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserInRole { AppUserInRoleID = 1, RoleTypeID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserLanguage()
        {
            ILogger<AppUserLanguageController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserLanguageController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserLanguage>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserLanguage>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserLanguage { AppUserLanguageID = 1, LanguageTypeID = 1, ProficiencyTypeID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserNote()
        {
            ILogger<AppUserNoteController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserNoteController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserNote>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserNote>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserNote { AppUserNoteID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserResearchTeam()
        {
            ILogger<AppUserResearchTeamController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserResearchTeamController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserResearchTeam>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserResearchTeam>(result1);
                Assert.Equal("user1", okResult1.CreatedBy);
                // test update 
                var pg1 = new AppUserResearchTeam { AppUserResearchTeamID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserTeamAssignment()
        {
            ILogger<AppUserTeamAssignmentController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserTeamAssignmentController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserTeamAssignment>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserTeamAssignment>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserTeamAssignment { AppUserTeamAssignmentID = 1, AssignmentTypeID = 1, TeamID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AppUserTeam()
        {
            ILogger<AppUserTeamController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserTeamController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AppUserTeam>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AppUserTeam>(result1);
                //var result1_1 = result1.FirstOrDefault();
                Assert.Equal("user1", result1.CreatedBy);
                // test update 
                var pg1 = new AppUserTeam { AppUserTeamID = 1, TeamID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var result3_1 = result3.FirstOrDefault();
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                //var result4_1 = result4.FirstOrDefault();
                Assert.Equal("user1", result4.CreatedBy);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }


        internal void PopulateData()
        {
            using (var context = new AppDbContext(options, null))
            {
                if (context.AppUserAbsence.Count() < 1)
                {
                    var p1 = new AppUserAbsence { AppUserAbsenceID = 1, Notes = "absence type 1", };
                    var p2 = new AppUserAbsence { AppUserAbsenceID = 2, Notes = "absence type 2", };
                    context.AppUserAbsence.Add(p1);
                    context.AppUserAbsence.Add(p2);

                    context.SaveChanges();
                }

                if (context.AppUserAddress.Count() < 1)
                {
                    var p1 = new AppUserAddress { AppUserAddressID = 1, Address1 = "address type 1", CountryID = 1, AddressTypeID = 1};
                    var p2 = new AppUserAddress { AppUserAddressID = 2, Address1 = "address type 2", CountryID = 1, AddressTypeID = 1 };
                    context.AppUserAddress.Add(p1);
                    context.AppUserAddress.Add(p2);

                    var p3 = new Country { CountryID = 1, CountryName = "test country" };
                    context.Country.Add(p3);
                    var p4 = new AddressType { AddressTypeID = 1, AddressTypeName = "test address type" };
                    context.AddressType.Add(p4);

                    context.SaveChanges();
                }

                if (context.AppUserCertificate.Count() < 1)
                {
                    var p1 = new AppUserCertificate { AppUserCertificateID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserCertificate { AppUserCertificateID = 2, CreatedBy = "user1", };
                    context.AppUserCertificate.Add(p1);
                    context.AppUserCertificate.Add(p2);

                    context.SaveChanges();
                }

                if (context.AppUserContact.Count() < 1)
                {
                    var p1 = new AppUserContact { AppUserContactID = 1, ContactTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserContact { AppUserContactID = 2, ContactTypeID = 1, CreatedBy = "user1", };
                    context.AppUserContact.Add(p1);
                    context.AppUserContact.Add(p2);

                    if (context.ContactType.Count() < 1)
                    {
                        var p3 = new ContactType { ContactTypeID = 1, ContactTypeName = "user1" };
                        context.ContactType.Add(p3);
                    }
                    context.SaveChanges();
                }

                if (context.AppUserContract.Count() < 1)
                {
                    var p1 = new AppUserContract { AppUserContractID = 1, ContractTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserContract { AppUserContractID = 2, ContractTypeID = 1, CreatedBy = "user1", };
                    context.AppUserContract.Add(p1);
                    context.AppUserContract.Add(p2);

                    if (context.ContractType.Count() < 1)
                    {
                        var p3 = new ContractType { ContractTypeID = 1, ContractTypeName = "contract 1" };
                        context.ContractType.Add(p3);
                    }

                    context.SaveChanges();
                }

                if (context.AppUserCountry.Count() < 1)
                {
                    var p1 = new AppUserCountry { AppUserCountryID = 1, CountryID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserCountry { AppUserCountryID = 2, CountryID = 1, CreatedBy = "user1", };
                    context.AppUserCountry.Add(p1);
                    context.AppUserCountry.Add(p2);

                    if(context.Country.Count() < 1)
                    {
                        var p3 = new Country { CountryID = 1, CountryName = "country 1" };
                        context.Country.Add(p3);
                    }
                    
                    context.SaveChanges();
                }

                if (context.AppUserEducation.Count() < 1)
                {
                    var p1 = new AppUserEducation { AppUserEducationID = 1, EducationTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserEducation { AppUserEducationID = 2, EducationTypeID = 1, CreatedBy = "user1", };
                    context.AppUserEducation.Add(p1);
                    context.AppUserEducation.Add(p2);

                    if (context.EducationType.Count() < 1)
                    {
                        var p3 = new EducationType { EducationTypeID = 1, EducationName = "education type 1" };
                        context.EducationType.Add(p3);
                    }

                    context.SaveChanges();
                }

                if (context.AppUserEmploymentRecord.Count() < 1)
                {
                    var p1 = new AppUserEmploymentRecord { AppUserEmploymentRecordID = 1, ContractTypeID = 1, DepartureTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserEmploymentRecord { AppUserEmploymentRecordID = 2, ContractTypeID = 1, DepartureTypeID = 1, CreatedBy = "user1", };
                    context.AppUserEmploymentRecord.Add(p1);
                    context.AppUserEmploymentRecord.Add(p2);

                    if (context.ContractType.Count() < 1)
                    {
                        var p3 = new ContractType { ContractTypeID = 1, ContractTypeName = "contract type 1" };
                        context.ContractType.Add(p3);
                    }
                    if (context.DepartureType.Count() < 1)
                    {
                        var p3 = new DepartureType { DepartureTypeID = 1, DepartureTypeName = "departure type 1" };
                        context.DepartureType.Add(p3);
                    }

                    context.SaveChanges();
                }

                if (context.AppUserFunction.Count() < 1)
                {
                    var p1 = new AppUserFunction { AppUserFunctionID = 1, FunctionTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserFunction { AppUserFunctionID = 2, FunctionTypeID = 1, CreatedBy = "user1", };
                    context.AppUserFunction.Add(p1);
                    context.AppUserFunction.Add(p2);

                    if (context.FunctionType.Count() < 1)
                    {
                        var p3 = new FunctionType { FunctionTypeID = 1, FunctionTypeName = "function type 1" };
                        context.FunctionType.Add(p3);
                    }

                    context.SaveChanges();
                }

                if (context.AppUserInRole.Count() < 1)
                {
                    var p1 = new AppUserInRole { AppUserInRoleID = 1, RoleTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserInRole { AppUserInRoleID = 2, RoleTypeID = 1, CreatedBy = "user1", };
                    context.AppUserInRole.Add(p1);
                    context.AppUserInRole.Add(p2);

                    if (context.RoleType.Count() < 1)
                    {
                        var p3 = new RoleType { RoleTypeID = 1, RoleTypeName = "role type 1" };
                        context.RoleType.Add(p3);
                    }

                    context.SaveChanges();
                }

                if (context.AppUserLanguage.Count() < 1)
                {
                    var p1 = new AppUserLanguage { AppUserLanguageID = 1, LanguageTypeID = 1, ProficiencyTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserLanguage { AppUserLanguageID = 2, LanguageTypeID = 1, ProficiencyTypeID = 1, CreatedBy = "user1", };
                    context.AppUserLanguage.Add(p1);
                    context.AppUserLanguage.Add(p2);

                    if (context.LanguageType.Count() < 1)
                    {
                        var p3 = new LanguageType { LanguageTypeID = 1, LanguageTypeName = "language type 1" };
                        context.LanguageType.Add(p3);
                    }
                    if (context.ProficiencyType.Count() < 1)
                    {
                        var p3 = new ProficiencyType { ProficiencyTypeID = 1, ProficiencyTypeName = "proficiency type 1" };
                        context.ProficiencyType.Add(p3);
                    }
                    context.SaveChanges();
                }

                if (context.AppUserNote.Count() < 1)
                {
                    var p1 = new AppUserNote { AppUserNoteID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserNote { AppUserNoteID = 2, CreatedBy = "user1", };
                    context.AppUserNote.Add(p1);
                    context.AppUserNote.Add(p2);

                    context.SaveChanges();
                }

                if (context.AppUserResearchTeam.Count() < 1)
                {
                    var p1 = new AppUserResearchTeam { AppUserResearchTeamID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserResearchTeam { AppUserResearchTeamID = 2, CreatedBy = "user1", };
                    context.AppUserResearchTeam.Add(p1);
                    context.AppUserResearchTeam.Add(p2);

                    context.SaveChanges();
                }

                if (context.AppUserTeamAssignment.Count() < 1)
                {
                    var p1 = new AppUserTeamAssignment { AppUserTeamAssignmentID = 1, TeamID = 1, AssignmentTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserTeamAssignment { AppUserTeamAssignmentID = 2, TeamID = 1, AssignmentTypeID = 1, CreatedBy = "user1", };
                    context.AppUserTeamAssignment.Add(p1);
                    context.AppUserTeamAssignment.Add(p2);

                    if (context.Team.Count() < 1)
                    {
                        var p3 = new Team { TeamID = 1, TeamName = "team 1" };
                        context.Team.Add(p3);
                    }

                    if (context.AssignmentType.Count() < 1)
                    {
                        var p4 = new AssignmentType { AssignmentTypeID = 1, AssignmentTypeName = "assignment type 1" };
                        context.AssignmentType.Add(p4);
                    }

                    context.SaveChanges();
                }

                if (context.AppUserTeam.Count() < 1)
                {
                    var p1 = new AppUserTeam { AppUserTeamID = 1, TeamID = 1, CreatedBy = "user1", };
                    var p2 = new AppUserTeam { AppUserTeamID = 2, TeamID = 1, CreatedBy = "user1", };
                    context.AppUserTeam.Add(p1);
                    context.AppUserTeam.Add(p2);

                    if (context.Team.Count() < 1)
                    {
                        var p3 = new Team { TeamID = 1, TeamName = "team 1" };
                        context.Team.Add(p3);
                    }

                    context.SaveChanges();
                }
                

            }
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}
