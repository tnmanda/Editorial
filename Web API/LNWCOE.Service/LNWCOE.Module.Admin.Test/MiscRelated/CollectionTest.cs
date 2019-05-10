using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class CollectionTest
    {
        [Fact]
        public void Collection()
        {
            IQueryable<Collection> CollectionCollection = Enumerable.Empty<Collection>().AsQueryable();
            Collection ct = new Collection { CollectionID = 1,  CollectionName = "Test Collection" };

            Mock<ICollectionRepository> CollectionService = new Mock<ICollectionRepository>();

            object obj = new object();

            try
            {
                CollectionService.Setup(x => x.GetAll()).Returns(CollectionCollection);
                CollectionService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                CollectionService.Setup(x => x.Add(It.IsAny<Collection>())).Returns(ct);
                CollectionService.Setup(x => x.Delete(It.IsAny<Collection>())).Verifiable();
                CollectionService.Setup(x => x.Update(It.IsAny<Collection>(), It.IsAny<object>())).Returns(ct);

                var CollectionObject = CollectionService.Object;
                var p1 = CollectionObject.GetAll();
                var p2 = CollectionObject.Get(1);
                var p3 = CollectionObject.Update(ct, obj);
                var p4 = CollectionObject.Add(ct);
                CollectionObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Collection>>(p1);
                Assert.IsAssignableFrom<Collection>(p2);
                Assert.Equal("Test Collection", p2.CollectionName);
                Assert.Equal("Test Collection", p3.CollectionName);

                CollectionService.VerifyAll();

                CollectionObject.Dispose();
            }
            finally
            {
                CollectionService = null;
            }
        }
    }
}
