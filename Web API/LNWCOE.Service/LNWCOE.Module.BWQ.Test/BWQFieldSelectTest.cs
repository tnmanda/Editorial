using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Module.BWQ.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.BWQ.Test
{
    public class BWQFieldSelectTest
    {
        [Fact]
        public void BWQFieldSelect()
        {
            IQueryable<BWQFieldSelect> BWQFieldSelectBWQFieldSelect = Enumerable.Empty<BWQFieldSelect>().AsQueryable();
            BWQFieldSelect ct = new BWQFieldSelect { BWQFieldSelectID = 1, FieldDisplayName = "Test BWQFieldSelect" };

            Mock<IBWQFieldSelectRepository> BWQFieldSelectService = new Mock<IBWQFieldSelectRepository>();

            object obj = new object();

            try
            {
                BWQFieldSelectService.Setup(x => x.GetAll()).Returns(BWQFieldSelectBWQFieldSelect);
                BWQFieldSelectService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                BWQFieldSelectService.Setup(x => x.Add(It.IsAny<BWQFieldSelect>())).Returns(ct);
                BWQFieldSelectService.Setup(x => x.Delete(It.IsAny<BWQFieldSelect>())).Verifiable();
                BWQFieldSelectService.Setup(x => x.Update(It.IsAny<BWQFieldSelect>(), It.IsAny<object>())).Returns(ct);

                var BWQFieldSelectObject = BWQFieldSelectService.Object;
                var p1 = BWQFieldSelectObject.GetAll();
                var p2 = BWQFieldSelectObject.Get(1);
                var p3 = BWQFieldSelectObject.Update(ct, obj);
                var p4 = BWQFieldSelectObject.Add(ct);
                BWQFieldSelectObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<BWQFieldSelect>>(p1);
                Assert.IsAssignableFrom<BWQFieldSelect>(p2);
                Assert.Equal("Test BWQFieldSelect", p2.FieldDisplayName);
                Assert.Equal("Test BWQFieldSelect", p3.FieldDisplayName);

                BWQFieldSelectService.VerifyAll();

                BWQFieldSelectObject.Dispose();
            }
            finally
            {
                BWQFieldSelectService = null;
            }
        }
    }
}
