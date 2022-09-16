using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Entity.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {

        }

        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        public Expression<Func<T, bool>> Criteria { get; }

        public List<Expression<Func<T, object>>> Include { get; } = new List<Expression<Func<T, object>>>();

        public Expression<Func<T, object>> Sort { get; private set; }

        public Expression<Func<T, object>> SortByDescending { get; private set; }

        protected void SortMethod(Expression<Func<T, object>> sortExpression)
        {
            Sort = sortExpression;
        }
        protected void SortByDescendingMethod(Expression<Func<T, object>> sortByDescendingExpression)
        {
            SortByDescending = sortByDescendingExpression;
        }
        protected void IncludeMethod(Expression<Func<T, object>> expression)
        {
            Include.Add(expression);
        }
    }
}