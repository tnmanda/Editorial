using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Module.BWQ.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.BWQ.Test
{
    public class BWQStatusTypeTest
    {
        [Fact]
        public void BWQStatusType()
        {
            IQueryable<BWQStatusType> BWQStatusTypeBWQStatusType = Enumerable.Empty<BWQStatusType>().AsQueryable();
            BWQStatusType ct = new BWQStatusType { BWQStatusTypeID = 1,  BwqStatusTypeDescription = "Test BWQStatusType" };

            Mock<IBWQStatusTypeRepository> BWQStatusTypeService = new Mock<IBWQStatusTypeRepository>();

            object obj = new object();

            try
            {
                BWQStatusTypeService.Setup(x => x.GetAll()).Returns(BWQStatusTypeBWQStatusType);
                BWQStatusTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                BWQStatusTypeService.Setup(x => x.Add(It.IsAny<BWQStatusType>())).Returns(ct);
                BWQStatusTypeService.Setup(x => x.Delete(It.IsAny<BWQStatusType>())).Verifiable();
                BWQStatusTypeService.Setup(x => x.Update(It.IsAny<BWQStatusType>(), It.IsAny<object>())).Returns(ct);

                var BWQStatusTypeObject = BWQStatusTypeService.Object;
                var p1 = BWQStatusTypeObject.GetAll();
                var p2 = BWQStatusTypeObject.Get(1);
                var p3 = BWQStatusTypeObject.Update(ct, obj);
                var p4 = BWQStatusTypeObject.Add(ct);
                BWQStatusTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<BWQStatusType>>(p1);
                Assert.IsAssignableFrom<BWQStatusType>(p2);
                Assert.Equal("Test BWQStatusType", p2.BwqStatusTypeDescription);
                Assert.Equal("Test BWQStatusType", p3.BwqStatusTypeDescription);

                BWQStatusTypeService.VerifyAll();

                BWQStatusTypeObject.Dispose();
            }
            finally
            {
                BWQStatusTypeService = null;
            }
        }
    }
}
