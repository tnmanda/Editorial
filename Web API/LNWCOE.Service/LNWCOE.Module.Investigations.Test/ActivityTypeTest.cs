using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class ActivityTypeTest
    {
        [Fact]
        public void ActivityType()
        {
            IQueryable<ActivityType> ActivityTypeActivityType = Enumerable.Empty<ActivityType>().AsQueryable();
            ActivityType ct = new ActivityType { ActivityTypeID = 1,  ActivityTypeName = "Test ActivityType" };

            Mock<IActivityTypeRepository> ActivityTypeService = new Mock<IActivityTypeRepository>();

            object obj = new object();

            try
            {
                ActivityTypeService.Setup(x => x.GetAll()).Returns(ActivityTypeActivityType);
                ActivityTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                ActivityTypeService.Setup(x => x.Add(It.IsAny<ActivityType>())).Returns(ct);
                ActivityTypeService.Setup(x => x.Delete(It.IsAny<ActivityType>())).Verifiable();
                ActivityTypeService.Setup(x => x.Update(It.IsAny<ActivityType>(), It.IsAny<object>())).Returns(ct);

                var ActivityTypeObject = ActivityTypeService.Object;
                var p1 = ActivityTypeObject.GetAll();
                var p2 = ActivityTypeObject.Get(1);
                var p3 = ActivityTypeObject.Update(ct, obj);
                var p4 = ActivityTypeObject.Add(ct);
                ActivityTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<ActivityType>>(p1);
                Assert.IsAssignableFrom<ActivityType>(p2);
                Assert.Equal("Test ActivityType", p2.ActivityTypeName);
                Assert.Equal("Test ActivityType", p3.ActivityTypeName);

                ActivityTypeService.VerifyAll();

                ActivityTypeObject.Dispose();
            }
            finally
            {
                ActivityTypeService = null;
            }
        }
    }
}
