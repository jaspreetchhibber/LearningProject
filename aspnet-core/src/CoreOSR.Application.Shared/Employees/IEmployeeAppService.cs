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
        //Task<String> AddEmployee();
        Task<Boolean> AddEmployee(EmployeeInput input);
        Task<List<EmployeeListDto>> GetEmployees();
    }
}
