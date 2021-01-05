using Abp.Application.Services;
using CoreOSR.Employees.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using CoreOSR.Employees;

namespace CoreOSR.Employees
{
    public interface IEmployeeAppService : IApplicationService
    {
        Task<long> AddEmployee(EmployeeInput input);
        Task<List<EmployeeListDto>> GetEmployees();
        Task<long> UpdateEmployee(EmployeeInput input);
        Task<Boolean> DeleteEmployee(int employeeId);
    }
}
