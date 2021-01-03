using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreOSR.Employees
{
    public interface IEmployeeManager : IDomainService
    {
        Task CreateEmployeeAsync(Employee employee);
        Task<IQueryable<Employee>> GetEmployees();
    }
}
