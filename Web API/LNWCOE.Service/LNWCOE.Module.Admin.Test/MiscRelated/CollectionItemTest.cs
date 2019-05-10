using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class CollectionItemTest
    {
        [Fact]
        public void CollectionItem()
        {
            IQueryable<CollectionItem> CollectionItemCollection = Enumerable.Empty<CollectionItem>().AsQueryable();
            CollectionItem ct = new CollectionItem { CollectionItemID = 1,  ItemText = "Test CollectionItem" };

            Mock<ICollectionItemRepository> CollectionItemService = new Mock<ICollectionItemRepository>();

            object obj = new object();

            try
            {
                CollectionItemService.Setup(x => x.GetAll()).Returns(CollectionItemCollection);
                CollectionItemService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                CollectionItemService.Setup(x => x.Add(It.IsAny<CollectionItem>())).Returns(ct);
                CollectionItemService.Setup(x => x.Delete(It.IsAny<CollectionItem>())).Verifiable();
                CollectionItemService.Setup(x => x.Update(It.IsAny<CollectionItem>(), It.IsAny<object>())).Returns(ct);
                CollectionItemService.Setup(x => x.GetIdIncluding(It.IsAny<int>())).Returns(ct);
                CollectionItemService.Setup(x => x.GetAllIncludingByName(It.IsAny<string>())).Returns(CollectionItemCollection);


                var CollectionItemObject = CollectionItemService.Object;
                var p1 = CollectionItemObject.GetAll();
                var p2 = CollectionItemObject.Get(1);
                var p3 = CollectionItemObject.Update(ct, obj);
                var p4 = CollectionItemObject.Add(ct);
                var p5 = CollectionItemObject.GetIdIncluding(1);
                var p6 = CollectionItemObject.GetAllIncludingByName("test");

                CollectionItemObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<CollectionItem>>(p1);
                Assert.IsAssignableFrom<CollectionItem>(p2);
                Assert.Equal("Test CollectionItem", p2.ItemText);
                Assert.Equal("Test CollectionItem", p3.ItemText);
                Assert.Equal("Test CollectionItem", p4.ItemText);
                Assert.IsAssignableFrom<CollectionItem>(p4);
                Assert.IsAssignableFrom<CollectionItem>(p5);
                Assert.Equal("Test CollectionItem", p5.ItemText);
                Assert.IsAssignableFrom<IQueryable<CollectionItem>>(p6);

                CollectionItemService.VerifyAll();

                CollectionItemObject.Dispose();
            }
            finally
            {
                CollectionItemService = null;
            }
        }
    }
}
