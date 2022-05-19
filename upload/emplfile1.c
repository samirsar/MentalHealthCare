#include<stdio.h>
#include<stdlib.h>
struct date
{
    int d,m,y;
};
struct employee
{
    char empcode[6];
    char empname[20];
    struct date join_date;
    float salary;
};
int main()
{
    int i;
    struct employee detail[3];
    FILE *fp;
    fp=fopen("emplfile1.txt","w");
    if(fp==NULL)
    {
        printf("file can not open");
        exit(1);
    }
    for(i=0;i<3;i++)
    {
    printf("please enter employee code and name\n");
    scanf("%s",detail[i].empcode);
    fflush(stdin);
    scanf("%s",detail[i].empname);
    fflush(stdin);
    printf("enter joining date\n");
    scanf("%d/%d/%d",&detail[i].join_date.d,&detail[i].join_date.m,&detail[i].join_date.y);
    fflush(stdin);
    printf("enter salary");
    scanf("%f",&detail[i].salary);
    fflush(stdin);
    }
    for(i=0;i<3;i++)
    {
    fprintf(fp,"%s\n%s\n",detail[i].empcode,detail[i].empname);
    fprintf(fp,"%d/%d/%d\n",detail[i].join_date.d,detail[i].join_date.m,detail[i].join_date.y);
    fprintf(fp,"%f\n",detail[i].salary);
    }
    fclose(fp);
    return 0;

}
