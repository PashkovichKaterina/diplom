package by.bsu.pashkovich;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class English2CApplication {
    public static void main(String[] args) {
        SpringApplication.run(English2CApplication.class, args);

        ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
        service.scheduleAtFixedRate(() -> System.out.println("hi"), 10, 10, TimeUnit.MINUTES);
    }
}
