using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CoreOSR.Employee
{
    public class EmployeeManager: CoreOSRDomainServiceBase,IEmployeeManager
    {
        private readonly IRepository<Employee, long> _employeeRepository;

        public EmployeeManager(IRepository<Employee, long> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        [UnitOfWork]
        public async Task CreateEmployeeAsync(Employee employee)
        {
            //using (CurrentUnitOfWork.SetTenantId(employee.TenantId))
            //{
                _employeeRepository.Insert(employee);
                await CurrentUnitOfWork.SaveChangesAsync();
            //}
        }
    }
}
