using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class ContactTypeTest
    {
        [Fact]
        public void ContactType()
        {
            IQueryable<ContactType> ContactTypeCollection = Enumerable.Empty<ContactType>().AsQueryable();
            ContactType ct = new ContactType { ContactTypeID = 1, ContactTypeName = "Test CT" };

            Mock<IContactTypeRepository> ContactTypeService = new Mock<IContactTypeRepository>();

            object obj = new object();

            try
            {
                ContactTypeService.Setup(x => x.GetAll()).Returns(ContactTypeCollection);
                ContactTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                ContactTypeService.Setup(x => x.Add(It.IsAny<ContactType>())).Returns(ct);
                ContactTypeService.Setup(x => x.Delete(It.IsAny<ContactType>())).Verifiable();
                ContactTypeService.Setup(x => x.Update(It.IsAny<ContactType>(), It.IsAny<object>())).Returns(ct);

                var ContactTypeObject = ContactTypeService.Object;
                var p1 = ContactTypeObject.GetAll();
                var p2 = ContactTypeObject.Get(1);
                var p3 = ContactTypeObject.Update(ct, obj);
                var p4 = ContactTypeObject.Add(ct);
                ContactTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<ContactType>>(p1);
                Assert.IsAssignableFrom<ContactType>(p2);
                Assert.Equal("Test CT", p2.ContactTypeName);
                Assert.Equal("Test CT", p3.ContactTypeName);

                ContactTypeService.VerifyAll();

                ContactTypeObject.Dispose();
            }
            finally
            {
                ContactTypeService = null;
            }
        }
    }
}
