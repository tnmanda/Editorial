using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserNoteTest
    {
        [Fact]
        public void AppUserNote()
        {
            IQueryable<AppUserNote> AppUserNoteCollection = Enumerable.Empty<AppUserNote>().AsQueryable();
            AppUserNote ct = new AppUserNote { AppUserNoteID = 1, Notes = "Test AppUserNote" };

            Mock<IAppUserNoteRepository> AppUserNoteService = new Mock<IAppUserNoteRepository>();

            object obj = new object();

            try
            {
                AppUserNoteService.Setup(x => x.GetAll()).Returns(AppUserNoteCollection);
                AppUserNoteService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserNoteService.Setup(x => x.Add(It.IsAny<AppUserNote>())).Returns(ct);
                AppUserNoteService.Setup(x => x.Delete(It.IsAny<AppUserNote>())).Verifiable();
                AppUserNoteService.Setup(x => x.Update(It.IsAny<AppUserNote>(), It.IsAny<object>())).Returns(ct);

                var AppUserNoteObject = AppUserNoteService.Object;
                var p1 = AppUserNoteObject.GetAll();
                var p2 = AppUserNoteObject.Get(1);
                var p3 = AppUserNoteObject.Update(ct, obj);
                var p4 = AppUserNoteObject.Add(ct);
                AppUserNoteObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserNote>>(p1);
                Assert.IsAssignableFrom<AppUserNote>(p2);
                Assert.Equal("Test AppUserNote", p2.Notes);
                Assert.Equal("Test AppUserNote", p3.Notes);

                AppUserNoteService.VerifyAll();

                AppUserNoteObject.Dispose();
            }
            finally
            {
                AppUserNoteService = null;
            }
        }
    }
}
