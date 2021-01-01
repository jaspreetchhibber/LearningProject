using Abp.Application.Services;
using CoreOSR.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CoreOSR.Employee
{
    public interface IEmployeeAppService : IApplicationService
    {
        //Task<String> AddEmployee();
        Task<Boolean> AddEmployee(EmployeeInput input);
    }
}
