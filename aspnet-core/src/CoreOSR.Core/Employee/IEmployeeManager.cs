using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CoreOSR.Employee
{
    public interface IEmployeeManager : IDomainService
    {
        Task CreateEmployeeAsync(Employee employee);
    }
}
