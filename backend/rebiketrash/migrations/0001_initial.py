from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('rebikeuser', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='challenge',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'challenge',
            },
        ),
        migrations.CreateModel(
            name='trash_image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('active', models.IntegerField(default=1)),
                ('image', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='rebikeuser.user')),
            ],
            options={
                'db_table': 'trash_image',
            },
        ),
        migrations.CreateModel(
            name='user_challenge',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('challenge_id', models.ForeignKey(db_column='challenge_id', on_delete=django.db.models.deletion.CASCADE, to='rebiketrash.challenge')),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='rebikeuser.user')),
            ],
            options={
                'db_table': 'user_challenge',
            },
        ),
        migrations.CreateModel(
            name='trash_kind',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('kind', models.CharField(max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('trash_image_id', models.ForeignKey(db_column='trash_image_id', on_delete=django.db.models.deletion.CASCADE, to='rebiketrash.trash_image')),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='rebikeuser.user')),
            ],
            options={
                'db_table': 'trash_kind',
            },
        ),
    ]
