using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class AddressTypeTest
    {
        [Fact]
        public void AddressType()
        {
            IQueryable<AddressType> AddressTypeCollection = Enumerable.Empty<AddressType>().AsQueryable();
            AddressType at = new AddressType { AddressTypeID = 1, AddressTypeName = "Test AT" };

            Mock<IAddressTypeRepository> AddressTypeService = new Mock<IAddressTypeRepository>();

            object obj = new object();

            try
            {
                AddressTypeService.Setup(x => x.GetAll()).Returns(AddressTypeCollection);
                AddressTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(at);
                AddressTypeService.Setup(x => x.Add(It.IsAny<AddressType>())).Returns(at);
                AddressTypeService.Setup(x => x.Delete(It.IsAny<AddressType>())).Verifiable();
                AddressTypeService.Setup(x => x.Update(It.IsAny<AddressType>(), It.IsAny<object>())).Returns(at);
                

                var AddressTypeObject = AddressTypeService.Object;
                var p1 = AddressTypeObject.GetAll();
                var p2 = AddressTypeObject.Get(1);
                var p3 = AddressTypeObject.Update(at, obj);
                var p4 = AddressTypeObject.Add(at);
                AddressTypeObject.Delete(at);

                Assert.IsAssignableFrom<IQueryable<AddressType>>(p1);
                Assert.IsAssignableFrom<AddressType>(p2);
                Assert.Equal("Test AT", p2.AddressTypeName);
                Assert.Equal("Test AT", p3.AddressTypeName);

                AddressTypeService.VerifyAll();

                AddressTypeObject.Dispose();
            }
            finally
            {
                AddressTypeService = null;
            }
        }
    }
}
