using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LNWCOE.Module.Admin.Model;
using Microsoft.EntityFrameworkCore;

namespace LNWCOE.Data.Context
{
    public class EditorialContext : DbContext
    {
        public EditorialContext(DbContextOptions<EditorialContext> options) : base(options) { }


        public DbSet<Pages> Pages { get; set; }


    }
}
