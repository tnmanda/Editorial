using System;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Data;
using LNWCOE.Models.BWQ;
using LNWCOE.Helpers.BWQ;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Xunit;

namespace LNWCOE.Tests.UnitTests
{
    public class BWQTests : TestBase, IDisposable
    {
        private DbContextOptions<AppDbContext> options;
        private IConfiguration _configuration;

        public BWQTests()
        {
            _configuration = conf;
            options = opt;
            PopulateData();
        }

        [Fact]
        public void Collection()
        {
            ILogger<CollectionController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new CollectionController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<Collection>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<Collection>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("collection type 1", result1.CollectionName);

                // test update 
                var pg1 = new Collection { CollectionID = 1, CollectionName = "collection type 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("collection type 1", result3.CollectionName);
                Assert.Equal("collection type 1 upd", result3.CollectionName);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("collection type 2", result4.CollectionName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);

            }
        }

        [Fact]
        public void CollectionItem()
        {
            ILogger<CollectionItemController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new CollectionItemController(context, _testlogger);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<CollectionItem>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<CollectionItem>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("collectionitem type 1", result1.ItemText);

                // test update 
                var pg1 = new CollectionItem { CollectionItemID = 1, CollectionID = 1, ItemText = "collectionitem type 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("collectionitem type 1", result3.ItemText);
                Assert.Equal("collectionitem type 1 upd", result3.ItemText);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("collectionitem type 2", result4.ItemText);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void StatusType()
        {
            ILogger<BWQStatusTypeController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new BWQStatusTypeController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<BWQStatusType>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<BWQStatusType>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("bwqstatus type 1", result1.BwqStatusTypeDescription);

                // test update 
                var pg1 = new BWQStatusType { BWQStatusTypeID = 1, BwqStatusTypeDescription = "bwqstatus type 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("bwqstatus type 1", result3.BwqStatusTypeDescription);
                Assert.Equal("bwqstatus type 1 upd", result3.BwqStatusTypeDescription);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("bwqstatus type 2", result4.BwqStatusTypeDescription);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void BWQFieldSelect()
        {
            ILogger<BWQFieldSelectController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new BWQFieldSelectController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<BWQFieldSelect>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<BWQFieldSelect>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("fieldselect type 1", result1.FieldDisplayName);

                // test update 
                var pg1 = new BWQFieldSelect { BWQFieldSelectID = 1, FieldDisplayName = "fieldselect type 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("fieldselect type 1", result3.FieldDisplayName);
                Assert.Equal("fieldselect type 1 upd", result3.FieldDisplayName);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("fieldselect type 2", result4.FieldDisplayName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void BWQDispositions()
        {
            ILogger<BWQDispositionsController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new BWQDispositionsController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<BWQDispositions>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<BWQDispositions>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("bwqdisposition type 1", result1.BWQDispositionsDescription);

                // test update 
                var pg1 = new BWQDispositions { BWQDispositionsID = 1, BWQDispositionsDescription = "bwqdisposition type 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("bwqdisposition type 1", result3.BWQDispositionsDescription);
                Assert.Equal("bwqdisposition type 1 upd", result3.BWQDispositionsDescription);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("bwqdisposition type 2", result4.BWQDispositionsDescription);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
                
        }

        [Fact]
        public void BWQEntities()
        {
            //ILogger<BWQEntitiesController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new BWQEntitiesController(context, null, null, null);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<BWQEntities>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<BWQEntities>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("bwqentity type 1", result1.EntityName);

                // test update 
                var pg1 = new BWQEntities { BWQEntitiesID = 1, BWQID = 1, EntityName = "bwqentity type 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("bwqentity type 1", result3.EntityName);
                Assert.Equal("bwqentity type 1 upd", result3.EntityName);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("bwqentity type 2", result4.EntityName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void BWQ()
        {
            ILogger<BWQController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new BWQController(context, _testlogger, null);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<JsonResult>(result);

                //JObject jObj = (JObject)JsonConvert.DeserializeObject(result.ToString());
                //int bwqcount = jObj.Count;
                //var pgcount = okResult.ToList().Count;

                //Assert.Equal(2, bwqcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<JsonResult>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                //Assert.Equal("bwqbatch 1", result1.BatchName);

                // test update 
                var pg1 = new BWQ { BWQID = 1, BatchName = "bwqbatch 1 upd" };
                //controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                //Assert.NotEqual("bwqbatch 1", result3.BatchName);
                //Assert.Equal("bwqbatch 1 upd", result3.BatchName);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                //Assert.Equal("bwqbatch 2", result4.BatchName);
                Assert.NotNull(result4);

                //IActionResult result5 = controller.Delete(2);
                //var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                //var result6 = controller.Get(2);
                //Assert.Null(result6);
            }
        }

        [Fact]
        public void BWQInstructions()
        {
            ILogger<BWQInstructionsController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new BWQInstructionsController(context, _testlogger, null);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<BWQInstructions>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<BWQInstructions>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("Instructions 1", result1.Instructions);

                // test update 
                var pg1 = new BWQInstructions { BWQInstructionsID = 1, BWQEntitiesID = 1, BWQDispositionsID = 1, BWQFieldSelectID = 1, Instructions = "Instructions 1 upd" };
                //controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.Equal("Instructions 1", result3.Instructions);
               

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("Instructions 2", result4.Instructions);

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
                if (context.Collection.Count() < 1)
                {
                    var p1 = new Collection { CollectionID = 1, CollectionName = "collection type 1", };
                    var p2 = new Collection { CollectionID = 2, CollectionName = "collection type 2", };
                    context.Collection.Add(p1);
                    context.Collection.Add(p2);

                    context.SaveChanges();
                }

                if (context.CollectionItem.Count() < 1)
                {
                    var p1 = new CollectionItem { CollectionItemID = 1, CollectionID = 1, ItemText = "collectionitem type 1", };
                    var p2 = new CollectionItem { CollectionItemID = 2, CollectionID = 1, ItemText = "collectionitem type 2", };
                    context.CollectionItem.Add(p1);
                    context.CollectionItem.Add(p2);

                    if (context.Collection.Count() < 1)
                    {
                        var p3 = new Collection { CollectionID = 1, CollectionName = "collection type 1", };
                    }

                    context.SaveChanges();
                }

                if (context.BWQStatusType.Count() < 1)
                {
                    var p1 = new BWQStatusType { BWQStatusTypeID = 1, BwqStatusTypeDescription = "bwqstatus type 1", };
                    var p2 = new BWQStatusType { BWQStatusTypeID = 2, BwqStatusTypeDescription = "bwqstatus type 2", };
                    context.BWQStatusType.Add(p1);
                    context.BWQStatusType.Add(p2);

                    context.SaveChanges();
                }

                if (context.BWQFieldSelect.Count() < 1)
                {
                    var p1 = new BWQFieldSelect { BWQFieldSelectID = 1, FieldDisplayName = "fieldselect type 1", };
                    var p2 = new BWQFieldSelect { BWQFieldSelectID = 2, FieldDisplayName = "fieldselect type 2", };
                    context.BWQFieldSelect.Add(p1);
                    context.BWQFieldSelect.Add(p2);

                    context.SaveChanges();
                }

                if (context.BWQDispositions.Count() < 1)
                {
                    var p1 = new BWQDispositions { BWQDispositionsID = 1, BWQDispositionsDescription = "bwqdisposition type 1", };
                    var p2 = new BWQDispositions { BWQDispositionsID = 2, BWQDispositionsDescription = "bwqdisposition type 2", };
                    context.BWQDispositions.Add(p1);
                    context.BWQDispositions.Add(p2);

                    context.SaveChanges();
                }

                if (context.BWQEntities.Count() < 1)
                {
                    var p1 = new BWQEntities { BWQEntitiesID = 1, BWQID = 1, EntityName = "bwqentity type 1", };
                    var p2 = new BWQEntities { BWQEntitiesID = 2, BWQID = 1, EntityName = "bwqentity type 2", };
                    context.BWQEntities.Add(p1);
                    context.BWQEntities.Add(p2);

                    if (context.BWQ.Count() < 1)
                    {
                        var p3 = new BWQ { BWQID = 1, BatchName = "bwqbatch 1", };
                    }
                        context.SaveChanges();
                }

                if (context.BWQ.Count() < 1)
                {
                    var p1 = new BWQ { BWQID = 1, BatchName = "bwqbatch 1", };
                    var p2 = new BWQ { BWQID = 2, BatchName = "bwqbatch 2", };
                    context.BWQ.Add(p1);
                    context.BWQ.Add(p2);

                    context.SaveChanges();
                }

                if (context.BWQInstructions.Count() < 1)
                {
                    var p1 = new BWQInstructions { BWQInstructionsID = 1, BWQEntitiesID = 1, BWQDispositionsID = 1, BWQFieldSelectID = 1, Instructions = "Instructions 1" };
                    var p2 = new BWQInstructions { BWQInstructionsID = 2, BWQEntitiesID = 1, BWQDispositionsID = 1, BWQFieldSelectID = 1, Instructions = "Instructions 2" };
                    context.BWQInstructions.Add(p1);
                    context.BWQInstructions.Add(p2);

                    if (context.BWQEntities.Count() < 1)
                    {
                        var p3 = new BWQEntities { BWQEntitiesID = 1, BWQID = 1, EntityName = "bwqentity type 1", };
                        context.BWQEntities.Add(p3);
                    }
                    if (context.BWQDispositions.Count() < 1)
                    {
                        var p4 = new BWQDispositions { BWQDispositionsID = 1, BWQDispositionsDescription = "bwqdisposition type 1", };
                        context.BWQDispositions.Add(p4);
                    }
                    if (context.BWQFieldSelect.Count() < 1)
                    {
                        var p5 = new BWQFieldSelect { BWQFieldSelectID = 1, FieldDisplayName = "fieldselect type 1", };
                        context.BWQFieldSelect.Add(p5);
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
