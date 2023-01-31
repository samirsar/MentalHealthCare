#include<stdio.h>
struct DATE
{
    int day,month,year;
};
struct DATE d,d1;
 int compare(struct DATE p,struct DATE q)
{
    if((p.day==q.day)&&(p.month==q.month)&&(p.year==q.year))
    {
        printf("yes that is equal\n");
    return 0;
    }
    else
        return 1;
}
int main()
{
int i;
    printf("enter date\n");
    scanf("%d/%d/%d",&d.day,&d.month,&d.year);
    printf("enter second date\n");
    scanf("%d/%d/%d",&d1.day,&d1.month,&d1.year);
    i=compare(d,d1);
    printf("%d\n",i);
    return 0;
}

